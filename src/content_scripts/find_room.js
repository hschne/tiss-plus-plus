
function addFindRoomButtons(){

}


function createRoomLink(roomName){
    var roomLink = $('<a>',{
        text: false,
        title: "Link to rooms page",
        href: 'http://www.wegweiser.ac.at/tuwien/hoersaal/'+roomName+'.html'
    });
    return roomLink;
}

function getMapFromRoomName(roomName){


}

function retrieveRoomNameList(callback){

}

function addButtonToRoomLink(room_link, button){
    var parentElement = room_link.parent();
    parentElement.append(button)
}

function getRoomLinks(){
    var matchingUrl = "/events/roomSchedule.xhtml";
    var links = $("a[href*='"  +matchingUrl + "']");
    return links;
}