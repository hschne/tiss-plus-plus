/**
 * Created by hasch on 10.09.2015.
 */
function LvaSearchPage(){

    this.displayRecentlyVisitedLvas = function (lvaList) {
        function renderTable(lvaList) {
            var contentInner = $('#contentInner').get(0);
            var existingContent = contentInner.innerHTML;

            var tableContent = '<table role="grid">';
            tableContent += '<thead id="courseList:courseTable_head"><tr role="row"><th id="courseList:courseTable:j_id_3j" class="ui-state-default ui-sortable-column ui-state-active" role="columnheader" tabindex="0"><span class="ui-column-title">Nummer</span><span class="ui-sortable-column-icon ui-icon ui-icon-carat-2-n-s ui-icon-triangle-1-n"></span></th><th id="courseList:courseTable:j_id_3p" class="ui-state-default ui-sortable-column" role="columnheader" tabindex="0"><span class="ui-column-title">Titel</span><span class="ui-sortable-column-icon ui-icon ui-icon-carat-2-n-s"></span></th><th id="courseList:courseTable:j_id_42" class="ui-state-default ui-sortable-column" role="columnheader" tabindex="0"><span class="ui-column-title">Semester</span><span class="ui-sortable-column-icon ui-icon ui-icon-carat-2-n-s"></span></th><th id="courseList:courseTable:j_id_45" class="ui-state-default ui-sortable-column" role="columnheader" tabindex="0"><span class="ui-column-title">Datum</span><span class="ui-sortable-column-icon ui-icon ui-icon-carat-2-n-s"></span></th></tr></thead>'
            for(var i = 0; i< lvaList.length; i++){
                var lva = lvaList[i];
                tableContent += renderTableRow(lva);
            }
            tableContent = tableContent + '</table>'
            contentInner.innerHTML = existingContent + tableContent;

        }

        function renderTableRow(lva){
            return '<tr data-ri="0" class="ui-widget-content ui-datatable-even" role="row"><td role="gridcell">'+lva.number+'</td><td role="gridcell"><a href="'+lva.url+'">'+lva.name+'</a></td><td role="gridcell">'+lva.semester+'</td><td role="gridcell">'+lva.date+'</td>'
        }

        renderTable(lvaList);
    }
}