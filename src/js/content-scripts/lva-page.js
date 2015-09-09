/**
 * Created by hasch on 09.09.2015.
 */
function LvaPage() {

    var instance = this;

    this.displayRoomMaps = function () {
        var wegweiserBasePage = "http://www.wegweiser.ac.at";

        var buttonTemplate = function (buttonLink) {
            return '<a class=\"maplink"href=\"' + buttonLink + '"><div class=\'mapbutton\'></div></a>';
        };

        function createButton(linkElement) {
            var currentRoom = linkElement.innerHTML;

            function renderButton(linkElement, buttonLink) {
                var parent = linkElement.parentElement;
                var parentContent = parent.innerHTML;
                parent.innerHTML = parentContent + buttonTemplate(buttonLink);
            }

            function getRoomLinkAndRenderButton() {
                var baseLink = wegweiserBasePage;
                instance.getJson(function (json) {
                    var rooms = json;
                    $.each(rooms, function (index, room) {
                        if (room.name.indexOf(currentRoom) > -1) {
                            var link = baseLink + room.link;
                            renderButton(linkElement, link)
                        }
                    });
                });
            };
            getRoomLinkAndRenderButton();
        }

        var roomLinks = $('a[href*=' + this.roomLink + ']');
        roomLinks.each(function () {
            var link = $(this);
            createButton(link.get(0));
        });
    };

};

LvaPage.prototype.getJson = function (callback) {
    $.getJSON(chrome.extension.getURL('/resources/room-links.json'), callback(json));
};

LvaPage.prototype.roomLink = "'/events/roomSchedule.xhtml'";

