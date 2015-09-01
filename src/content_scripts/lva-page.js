function renderRoomButtons(){

    function createButton(linkElement) {
        var currentRoom = linkElement.innerHTML;

        var buttonHtml = "<button class='mapbutton'>M</button>";

        function renderButton(linkElement, buttonLink) {
            var parent = linkElement.parentElement;
            var parentContent = parent.innerHTML;
            parent.innerHTML = parentContent + "<a href="+buttonLink+" >" +buttonHtml+"</a>";
        }

        function getRoomLinkAndRenderButton() {
            var baseLink = "http://www.wegweiser.ac.at/";
            $.getJSON(chrome.extension.getURL('/resources/room-links.json'), function (json) {
                var rooms = json;
                $.each(rooms, function (index, room) {
                    if (matchesCurrentRoom(room.name)) {
                        var link = baseLink + room.link;
                        renderButton(linkElement, link)
                    }
                })
            });
        }

        function matchesCurrentRoom(scrapedRoom) {
            var formattedScrapedRoom = scrapedRoom.replace(" - TU Wien","");
            if(currentRoom == "EI 7 Hörsaal"){
                var i =5;
            }
            formattedScrapedRoom = formattedScrapedRoom.replace(/ +(?= )/g,"");
            var formattedTissRoom = currentRoom.replace(" Hörsaal", "");
            var contains = ((formattedScrapedRoom.indexOf(formattedTissRoom) > -1) || formattedScrapedRoom == formattedTissRoom);
            return contains;
        }
        getRoomLinkAndRenderButton();
    }

    var roomLinks =$("a[href^= '/events/roomSchedule.xhtml']");
    roomLinks.each(function () {
        var link = $(this);
        createButton(link.get(0));
    })
}

renderRoomButtons();


