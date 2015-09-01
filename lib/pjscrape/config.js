pjs.config({
    writer: 'file',
    outFile: 'room-links.json',
    timeoutInterval: 1000,
    timeoutLimit: 1000,
});
pjs.addSuite({
    url: 'http://www.wegweiser.ac.at/uni/hoersaal_liste?uni_code=E',
    moreUrls: '.maintext ul li a',  
    maxDepth: 1,
    scraper: function() {
        var result = [];
        var room = $('td.header h1 span').text().replace(' - TU Wien',"").replace(/ +(?= )/g,'');
        $('img[alt*="Lageplan"][src*="plaene"]').each(function() {
            var parent = $(this).parent();
            var href = parent.attr("href");
            var item = {
                name: room,
                link: href
            };
            result.push(item);
        });
        return result;
    }
});