/**
 * Created by hasch on 07.09.2015.
 */
function Lva(name, number, semester, dateVisited, link){
    this.name = name;
    this.number = number;
    this.semester = semester;
    this.dateVisited = dateVisited;
    this.link = link;
}

Lva.prototype.equals = function (lva) {
    if(lva.name != this.name){
        return false
    }
    if(lva.number != this.number){
        return false;
    }
    if(lva.semester != this.semester) {
        return false;
    }
    return true;
}