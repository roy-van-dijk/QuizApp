var countryArray = ['AND','ARE','AFG','ATG','ALB','ARM','AGO','ARG','AUT','AUS','AZE','BIH','BRB','BGD','BEL','BFA','BGR','BHR','BDI','BEN','BRN','BOL','BRA','BHS','BTN','BWA','BLR','BLZ','CAN','COD','CAF','COG','CHE','CIV','CHL','CMR','CHN','COL','CRI','CUB','CPV','CYP','CZE','DEU','DJI','DNK','DMA','DOM','DZA','ECU','EST','EGY','ERI','ESP','ETH','FIN','FJI','FSM','FRA','GAB','GBR','GRD','GEO','GHA','GMB','GIN','GNQ','GRC','GTM','GNB','GUY','HND','HRV','HTI','HUN','IDN','IRL','ISR','IND','IRQ','IRN','ISL','ITA','JAM','JOR','JPN','KEN','KGZ','KHM','KIR','COM','KNA','PRK','KOR','KWT','KAZ','LAO','LBN','LIE','LKA','LBR','LSO','LTU','LUX','LVA','LBY','MAR','MCO','MDA','MNE','MDG','MHL','MKD','MLI','MMR','MNG','MRT','MLT','MUS','MDV','MWI','MEX','MYS','MOZ','NAM','NER','NGA','NIC','NLD','NOR','NPL','NRU','NZL','OMN','PAN','PER','PNG','PHL','PAK','POL','PSE','PRT','PLW','PRY','QAT','ROU','SRB','RUS','RWA','SAU','SLB','SYC','SDN','SSD','SWE','SGP','SVN','SVK','SLE','SMR','SEN','SOM','SUR','STP','SLV','SYR','SWZ','TCD','TGO','THA','TJK','TLS','TKM','TUN','TON','TUR','TTO','TUV','TWN','TZA','UNK', 'UKR','UGA','USA','URY','UZB','VAT','VCT','VEN','VNM','VUT','WSM','YEM','ZAF','ZMB','ZWE'];
var correctCountries = [];
var countryNumber = 0;

function addFlag(path){
	var flagPath = $(".flagDisplay").css("background-image");
	flagPath = flagPath.replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, '');
	$(path).prepend('<img class="listImg" src="'+flagPath+'">&nbsp;');
}

$(document).ready(function(){

	shuffleArray(countryArray);

	function shuffleArray(array) {
	    for (var i = array.length - 1; i > 0; i--) {
	        var j = Math.floor(Math.random() * (i + 1));
	        var temp = array[i];
	        array[i] = array[j];
	        array[j] = temp;
	    }
	    return array;
	}

	var flagPaths = $.each(countryArray, function(key, value) {
    	var flagPath = 'flags/'+value.toLowerCase()+'.svg';
	});
	var images = new Array()
	function preload(flagPaths) {
		for (i = 0; i < flagPaths.length; i++) {
			images[i] = new Image();
			images[i].src = 'flags/'+flagPaths[i].toLowerCase()+'.svg';
		}
	}
	preload(flagPaths);

	$('.flagDisplay').css('background-image', 'url("flags/' + countryArray[countryNumber].toLowerCase() + '.svg")');

	$('.nextFlag').click(function(){
		if(countryNumber < 195){
			countryNumber++;
			$('.flagDisplay').css('background-image', 'url("flags/' + countryArray[countryNumber].toLowerCase() + '.svg")');
			$('.input').val('');
			if($('.list li#'+countryArray[countryNumber]).hasClass('correct')){
				$('.input').val($('.list li#'+countryArray[countryNumber]).text());
				$('.input').attr('disabled', true);
			}
			else{
				$('.input').attr('disabled', false);
			}
			$('.input').focus();
		}
	});

	$('.prevFlag').click(function(){
		if(countryNumber > 0){
			countryNumber--;
			$('.flagDisplay').css('background-image', 'url("flags/' + countryArray[countryNumber].toLowerCase() + '.svg")');
			$('.input').val('');
			if($('.list li#'+countryArray[countryNumber]).hasClass('correct')){
				$('.input').val($('.list li#'+countryArray[countryNumber]).text());
				$('.input').attr('disabled', true);
			}
			else{
				$('.input').val('');
				$('.input').attr('disabled', false);
			}
			$('.input').focus();
		}
	});

	$('.giveuptext').click(function(){
		$('.list ul li.giveup').each(function(){
			$(this).prepend('<img class="listImg" src="flags/'+this.id.toLowerCase()+'.svg">&nbsp;');
			$('.listImg').css('width', '23px');
			$('.listImg').css('height', '18px');
		});
	});

	// e = which key pressed
	$(document).keydown(function(e){
		// 13 = enter, 37 = arrow back, 39 = arrow forward
		if(e.which === 13 || e.which === 39){
			$('.nextFlag').trigger('click');
		}
		if(e.which === 37){
			$('.prevFlag').trigger('click');
		}
	});

	$('.input').keyup(function(){

		var input = makeSortString($('.input').val()).toLowerCase().trim();
		var counter = 0;

		var guessedCountry = $('.list li#'+countryArray[countryNumber]);

		if(countryArray[countryNumber] == checkCountry(input)){
			if (!$(guessedCountry).hasClass('correct')){
				$(guessedCountry).removeClass('incorrect');
				$(guessedCountry).addClass('correct');
				counter = (parseInt($('.score').text()) + 1);
				$('.score').text(counter);
				$('.input').attr('disabled', true);
				addFlag(guessedCountry);
				if($('#forward').prop('checked') === true){
					$('.nextFlag').trigger('click');
				}
				correctCountries.push(guessedCountry);
			}
		}
	});

});