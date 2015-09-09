/**
 * Created by hasch on 09.09.2015.
 */
function LvaPage(location) {
    var instance = this;
    var pageLocation = location;

    function getTextWithoutChildren(element) {
        return element.clone()
            .children()
            .remove()
            .end()
            .text();

    }

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
                    $.each(json, function (index, room) {
                        if (room.name.indexOf(currentRoom) > -1) {
                            var link = baseLink + room.link;
                            renderButton(linkElement, link)
                        }
                    });
                });
            }
            getRoomLinkAndRenderButton();
        }

        var roomLinks = $('a[href*=' + this.roomLink + ']');
        roomLinks.each(function () {
            var link = $(this);
            createButton(link.get(0));
        });
    };

    this.getLva = function () {
        var $contentInner = $('#contentInner');
        var header = $contentInner.find('h1').first();
        var number = header.find('span').first().text();
        var name = getTextWithoutChildren(header);
        var subHeader = $contentInner.find('#subHeader').first();
        var semester = subHeader.text().split(',')[0];
        var date = new Date().toJSON();
        return new Lva(name, number, semester, date, pageLocation)
    };
}
LvaPage.prototype.getJson = function (callback) {
    $.getJSON(chrome.extension.getURL('/resources/room-links.json'), function(data) {
        callback(data)
    });
};

LvaPage.prototype.roomLink = "'/events/roomSchedule.xhtml'";

