function makeSortString(s) {
	  if(!makeSortString.translate_re) makeSortString.translate_re = /[öäüëïéôșăóãñáàíìåÖÄÜËÏÉÔȘĂÓÃÑÁÀÍÌÅ]/g;
	  var translate = {
	    "ä": "a", "å" : "a", "ö": "o", "ü": "u", "ë": "e", "ï": "i", "é": "e", "ô": "o", "ș": "s", "ă": "a", "ó": "o", "ã": "a", "ñ": "n", "á": "a", "à": "a", "í": "i", "ì": "i", "ú": "u",
	    "Ä": "A", "Å" : "A", "Ö": "O", "Ü": "U", "Ë": "E", "Ï": "I", "É": "E", "Ô": "O", "Ș": "S", "Ă": "A", "Ó": "O", "Ã": "A", "Ñ": "N", "Á": "A", "À": "A", "Í": "I", "Ì": "I", "Ú": "U" // probably more to come
	  };
	  return ( s.replace(makeSortString.translate_re, function(match) {
	    return translate[match];
	  }) );
}

$(document).ready(function(){

	var translations = {
		"english" : {
			"back" 							: "Back",
			"giveup"						: "Give Up",
			"lost" 							: "You lost. Time: ",
			"won" 							: "Congratulations, you won in: ",
			"list" 							: "list-english",
			"menu" 							: "mainmenuenglish",
			"gametype"						: "Select your game type:",
			"endtime"						: "Time",
			"date"							: "Date",
			"country"						: "Countries",
			"capital" 						: "Capitals",
			"flag" 							: "Flags",
			"municipalities_netherlands"	: "Dutch Municipalities",
			"states_usa" 					: "American States",
			"regions_china"					: "Regions of China",
			"regions_russia"				: "Regions of Russia",
			"provinces_spain"				: "Provinces of Spain",
			"provinces_sweden"				: "Provinces of Sweden",
			"guidetext"						: "Welcome to Globe Quiz. Select a game type below and guess as many countries, cities, states, etc. as you can! When you get one correct, it will light up in green on the map. Good luck!",
			"hiscores"						: "Personal Highscores"
		},
		"dutch" : {
			"back" 							: "Terug",
			"giveup"						: "Opgeven",
			"lost" 							: "Je hebt verloren. Tijd: ",
			"won" 							: "Gefeliciteerd, je hebt gewonnen in: ",
			"list" 							: "list-dutch",
			"menu" 							: "mainmenudutch",
			"gametype"						: "Selecteer je speltype:",
			"endtime"						: "Tijd",
			"date"							: "Datum",
			"country"						: "Landen",
			"capital" 						: "Hoofdsteden",
			"flag" 							: "Vlaggen",
			"municipalities_netherlands"	: "Nederlandse gemeenten",
			"states_usa" 					: "Amerikaanse staten",
			"regions_china"					: "Regio's van China",
			"regions_russia"				: "Regio's van Rusland",
			"provinces_spain"				: "Provincies van Spanje",
			"provinces_sweden"				: "Provincies van Zweden",
			"guidetext"						: "Welkom bij Globe Quiz. Selecteer hieronder een speltype en raad zo veel mogelijk laden, steden, staten, etc als je kan. Wanneer je er een correct hebt, zal het groen worden op de kaart. Succes!",
			"hiscores"						: "Persoonlijke Highscores"
		}
	}

	// Replace all SVG images with inline SVG
    jQuery('img.svg').each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Replace image with new SVG
            $img.replaceWith($svg);

        }, 'xml');

    });

	function endscreen(outcome){
		$('.timer').stopwatch().stopwatch('stop');

		var id 			= Math.floor(Date.now() / 1000).toString();
		var endtime 	= $('.timer').text();
		var score 		= $('.score').text();
		var gametype 	= $('.gametype').text();
		var result 		= {};
		result[id] 		= { 'gametype' : [gametype], 'endtime' : [endtime], 'score' : [score] };

		appendToStorage("globequiz_hiscores", JSON.stringify(result));

		if (outcome == "win"){
			alert($('.endmessage_win').text() + endtime);
		}
		else{
			alert($('.endmessage_loss').text() + endtime);
		}

		$('.input').prop("disabled", true);

	}

	function appendToStorage(name, data){
	    var old = localStorage.getItem(name);
	    if(old === null) {
	    	old = "";
	    	localStorage.setItem(name, old + data);
	    }
	    else{
	    	localStorage.setItem(name, old.slice(0, -1) + "," + data.substring(1));
	    }
	}

	$('.giveuptext').click(function(){
		$('.incorrect').addClass('giveup');
		$('.giveup').removeClass('incorrect');
		endscreen("loss");
		$('.giveuptext').unbind("click");
	});

	var timerStarted = false;
	$('.input').keyup(function(){
		if(timerStarted == false){
			$('.timer').stopwatch().stopwatch('start');
			timerStarted = true;
		}
	});

	if($('.score').length > 0){
		new MutationObserver(function(){
			if($('.score').text() == $('.targetScore').text()){
				endscreen("win");
			}
		}).observe($('.score')[0], {childList: true, subtree: true});
	}

	$('.langdropdown li:not(.dropdownarrow)').click(function(){
		var newLang = this.id;

		localStorage.setItem("language", newLang);

		$('ul.mainmenu').addClass('vishidden');
        setTimeout(function(){
            $('ul#mainmenu'+newLang).removeClass('vishidden');
        }, 300);

        location.reload();
	});

	$('.zoom').click(function(){
		if($('#zoom').prop('checked') === true){
			$('.map svg').css('transform', 'scale(1.5)');
		}
		else{
			$('.map svg').css('transform', 'scale(1)');
		}
		// WTF? Mobile dragscroll fix
		setTimeout(function(){
			$('.map').css('transform', 'none');
		}, 100);

	});

	$('.guide').click(function(){
		$('.guide').hide();
		localStorage.globequiz_guide_off = true;
	});

	if(localStorage.globequiz_guide_off == null){
		$('.guide').removeClass('displaynone');
	}

	addTranslations();
	function addTranslations(){
		// Default language
		if(localStorage.language === undefined){
			localStorage.setItem("language", "english");
		}

 		// Current language
		var curLang = localStorage.language;

		// Main menu language
		$('.guidetext').text(translations[curLang].guidetext);
		$('.menu_hiscores').text(translations[curLang].hiscores);
		$('.menu_country').append(translations[curLang].country);
		$('.menu_capital').append(translations[curLang].capital);
		$('.menu_flag').append(translations[curLang].flag);
		$('.menu_municipalities_netherlands').append(translations[curLang].municipalities_netherlands);
		$('.menu_states_usa').append(translations[curLang].states_usa);
		$('.menu_regions_china').append(translations[curLang].regions_china);
		$('.menu_regions_russia').append(translations[curLang].regions_russia);
		$('.menu_provinces_spain').append(translations[curLang].provinces_spain);
		$('.menu_provinces_sweden').append(translations[curLang].provinces_sweden);

		// Interface language
		$('.backtext').text(translations[curLang].back);
		$('.giveuptext').text(translations[curLang].giveup);
		$('.endmessage_win').text(translations[curLang].won);
		$('.endmessage_loss').text(translations[curLang].lost);

		// Answer language
		$('#list-english').addClass('displaynone');
		$('#list-dutch').addClass('displaynone');
		$('#'+translations[curLang].list).removeClass('displaynone');
		$('#'+translations[curLang].list).addClass('list');

		// Hiscores language, first also main menu
		$('.gameselect').text(translations[curLang].gametype);
		$('option[value="country"]').text(translations[curLang].country);
		$('option[value="capital"]').text(translations[curLang].capital);
		$('option[value="flag"]').text(translations[curLang].flag);
		$('option[value="municipalities_netherlands"]').text(translations[curLang].municipalities_netherlands);
		$('option[value="states_usa"]').text(translations[curLang].states_usa);
		$('option[value="regions_china"]').text(translations[curLang].regions_china);
		$('option[value="regions_russia"]').text(translations[curLang].regions_russia);
		$('option[value="provinces_spain"]').text(translations[curLang].provinces_spain);
		$('option[value="provinces_sweden"]').text(translations[curLang].provinces_sweden);
		$('.hiscoresendtime').text(translations[curLang].endtime);
		$('.hiscoresdate').text(translations[curLang].date);

	}

    $(document).mouseup(function (e){
        var container = $(".langselect");

        if (!container.is(e.target) && container.has(e.target).length === 0){
            $('#dropdownToggle').prop('checked', false);
            //$('.langselect').trigger('click');
        }
    });
});
