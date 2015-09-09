/**
 * Created by hasch on 09.09.2015.
 */
function LvaPage(location) {

    var instance = this;
    var location = location;

    function getTextWithoutChildren(element) {
        return element.clone()    //clone the element
            .children() //select all the children
            .remove()   //remove all the children
            .end()  //again go back to selected element
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

    this.getLva = function () {
        var header = $('#contentInner h1').first();
        var number = header.find('span').first().text();
        //
        var name = getTextWithoutChildren(header);
        var subHeader = $('#contentInner #subHeader').first();
        var semester = subHeader.text().split(',')[0];
        var date = new Date();
        return new Lva(name, number, semester, date, location)
    }
};

LvaPage.prototype.getJson = function (callback) {
    $.getJSON(chrome.extension.getURL('/resources/room-links.json'), callback(json));
};

LvaPage.prototype.roomLink = "'/events/roomSchedule.xhtml'";

