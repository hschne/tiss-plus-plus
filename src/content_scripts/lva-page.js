function GetRoomLinks() {
    var roomLinks = $("a[href^='/events/roomSchedule.xhtml']");
    return roomLinks;
}

function createButton(){
    var button = document.createElement("button"),
        text = document.createTextNode("test");
    button.appendChild(text);
    return button;
}

var button = createButton();

this.renderButton = function(link){
    link.innerHTML = "FUNKY MONKY"
}


var roomLinks = GetRoomLinks();

roomLinks.each(function(index){
    var link = $(this);
    console.log(index + ": " +$(this).text());
    renderButton(link.get(0));
})
