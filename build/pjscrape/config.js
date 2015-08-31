pjs.config({ 
    writer: 'file',
    outFile: 'room-links.json'
});
pjs.addSuite({
    url: 'http://www.wegweiser.ac.at/uni/hoersaal_liste?uni_code=E',
    scraper: function() {
    	var result = []
    	$('.maintext ul li a').each(function(){
    		var name = $(this).text().trim();
    		var link = $(this).attr('href');
    		result.push([name, link]);
    	});
    	return result;
    }
});
