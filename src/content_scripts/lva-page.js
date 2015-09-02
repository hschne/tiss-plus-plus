function renderRoomButtons(){

    function createButton(linkElement) {
        var currentRoom = linkElement.innerHTML;

        var buttonHtml = "<div class='mapbutton'></div>";

        function renderButton(linkElement, buttonLink) {
            var parent = linkElement.parentElement;
            var parentContent = parent.innerHTML;

            parent.innerHTML = parentContent +  '<a class=\"maplink\"href=\"'+buttonLink+ '\" >' +buttonHtml+ "</a>";
        }

        function getRoomLinkAndRenderButton() {
            var baseLink = "http://www.wegweiser.ac.at";
            $.getJSON(chrome.extension.getURL('/resources/room-links.json'), function (json) {
                var rooms = json;
                $.each(rooms, function (index, room) {
                    if (room.name.indexOf(currentRoom) > -1) {
                        var link = baseLink + room.link;
                        renderButton(linkElement, link)
                    }
                })
            });
        }

        getRoomLinkAndRenderButton();
    }

    var roomLinks =$("a[href*='/events/roomSchedule.xhtml']");
    roomLinks.each(function () {
        var link = $(this);
        createButton(link.get(0));
    })
}

renderRoomButtons();


