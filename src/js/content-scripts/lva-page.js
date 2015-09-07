function renderRoomButtons(){

    const wegweiserBasePage = "http://www.wegweiser.ac.at";

    const roomLink = "'/events/roomSchedule.xhtml'";

    const buttonTemplate =  function(buttonLink) {
        return '<a class=\"maplink\"href=\"'+buttonLink+ '\" ><div class=\'mapbutton\'></div></a>';
    }

    function createButton(linkElement) {
        var currentRoom = linkElement.innerHTML;

        function renderButton(linkElement, buttonLink) {
            var parent = linkElement.parentElement;
            var parentContent = parent.innerHTML;

            parent.innerHTML = parentContent + buttonTemplate(buttonLink);
        }

        function getRoomLinkAndRenderButton() {
            var baseLink = wegweiserBasePage;
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

    var roomLinks =$('a[href*='+roomLink+']');
    roomLinks.each(function () {
        var link = $(this);
        createButton(link.get(0));
    })
}

renderRoomButtons();


