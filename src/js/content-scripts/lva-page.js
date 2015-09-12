/**
 * Created by hasch on 09.09.2015.
 */
function LvaPage(location) {
    var instance = this;

    var url = location;

    function getTextWithoutChildren(element) {
        return element.clone()
            .children()
            .remove()
            .end()
            .text();

    }

    function sanitizeText(text){
        return text.replace(/(\r\n|\n|\r)/gm,"").trim();
    }

    this.displayRoomMaps = function () {
        var wegweiserBasePage = "http://www.wegweiser.ac.at";

        var buttonTemplate = function (buttonLink) {
            return '<a class=\"map-button"href=\"' + buttonLink + '"><div class=\'mapbutton\'></div></a>';
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
        var subHeader = $contentInner.find('#subHeader').first();
        var name = sanitizeText(getTextWithoutChildren(header));
        var number = sanitizeText(header.find('span').first().text());
        var semester = sanitizeText(subHeader.text().split(',')[0]);
        var date = new Date().toJSON();
        return {
            name: name,
            number: number,
            semester: semester,
            date: date,
            url: url
        };
    };
}
LvaPage.prototype.getJson = function (cb) {
    var url = chrome.extension.getURL('resources/room-links.json');
    $.getJSON(url, function(data){
        cb(data);
    });
};

LvaPage.prototype.roomLink = "'/events/roomSchedule.xhtml'";

