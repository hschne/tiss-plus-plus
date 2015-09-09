/**
 * Created by hasch on 05.09.2015.
 */
function renderLvaSearch() {

    const table = '<div>Hello!</div>'

    function renderLastLva() {
        var lvaListContainer = $('#contentInner').get(0);
        lvaListContainer.innerHTML = lvaListContainer.innerHTML + table;
    }

    renderLastLva();
}

renderLvaSearch();
