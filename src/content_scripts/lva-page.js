
function createButton(linkElement) {
    var currentRoom = linkElement.innerHTML;

    function renderButton(linkElement, buttonLink) {
        var parent = linkElement.parentElement;
        var parentContent = parent.innerHTML;
        parent.innerHTML = parentContent + "<a href="+buttonLink+" >Map</a>"
    }

    function getRoomLinkAndRenderButton() {
        var baseLink = "http://www.wegweiser.ac.at/";
        $.getJSON(chrome.extension.getURL('/resources/room-links.json'), function (json) {
            var rooms = json.rooms;
            $.each(rooms, function (index, room) {
                var roomName = room.name;
                if (roomName == currentRoom) {
                    var link = baseLink + room.link;
                    renderButton(linkElement, link)
                }
            })
        });
    }
    getRoomLinkAndRenderButton();
}

function renderAllRoomButtons(){

    var roomLinks =$("a[href^= '/events/roomSchedule.xhtml']");
    roomLinks.each(function () {
        var link = $(this);
        createButton(link.get(0));
    })
}

renderAllRoomButtons();


