function makeSortString(s) {
	  if(!makeSortString.translate_re) makeSortString.translate_re = /[öäüëïéôșăóãÖÄÜËÏÉÔȘĂÓÃ]/g;
	  var translate = {
	    "ä": "a", "ö": "o", "ü": "u", "ë": "e", "ï": "i", "é": "e", "ô": "o", "ș": "s", "ă": "a", "ó": "o", "ã": "a",
	    "Ä": "A", "Ö": "O", "Ü": "U", "Ë": "E", "Ï": "I", "É": "E", "Ô": "O", "Ș": "S", "Ă": "A", "Ó": "O", "Ã": "A" // probably more to come
	  };
	  return ( s.replace(makeSortString.translate_re, function(match) {
	    return translate[match];
	  }) );
}

$(document).ready(function(){

	var translations = {
		"english" : {
			"back" 	: "Back",
			"giveup": "Give Up",
			"lost" 	: "You lost. Time: ",
			"won" 	: "Congratulations, you won in: ",
			"list" 	: "list-english",
			"menu" 	: "mainmenuenglish"
		},
		"dutch" : {
			"back" 	: "Terug",
			"giveup": "Opgeven",
			"lost" 	: "Je hebt verloren. Tijd: ",
			"won" 	: "Gefeliciteerd, je hebt gewonnen in: ",
			"list" 	: "list-dutch",
			"menu" 	: "mainmenudutch"
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
		var endtime = $('.timer').text();

		if (outcome == "win"){
			alert($('.endmessage_win').text() + endtime);
		}
		else{
			alert($('.endmessage_loss').text() + endtime);
		}
	}

	$('.giveuptext').click(function(){
		$('.incorrect').addClass('giveup');
		$('.giveup').removeClass('incorrect');
		endscreen("loss");
		$('.input').prop('disabled', true);
	});

	var timerStarted = false;
	$('.input').keyup(function(){
		if(timerStarted == false){
			$('.timer').stopwatch().stopwatch('start');
			timerStarted = true;
		}
	});

	$('.score').bind("DOMSubtreeModified",function(){
		if($('.score').text() == $('.targetScore').text()){
			var score = $('.timer').text();
			endscreen("win");
		}
	});

	$('.langdropdown li').click(function(){
		var newLang = this.id;

		localStorage.setItem("language", newLang);

		$('ul.mainmenu').addClass('vishidden');
        setTimeout(function(){
            $('ul#mainmenu'+newLang).removeClass('vishidden');
        }, 300);
	});

	$('.zoom').click(function(){
		if($('#zoom').prop('checked') === true){
			$('.map svg').addClass('svgzoom');
			$('.map').animate( { scrollLeft: '493' }, 300);
		}
		else{
			$('.map svg').removeClass('svgzoom');
		}
	});

	addTranslations();
	function addTranslations(){
		// Default language
		if(localStorage.language === undefined){
			localStorage.setItem("language", "english");
		}

 		// Current language
		var curLang = localStorage.language;

		// Main menu language
		$('.mainmenu').addClass('vishidden');
		$('#'+translations[curLang].menu).removeClass('vishidden');

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
	}

    $(document).mouseup(function (e){
        var container = $(".langselect");

        if (!container.is(e.target) && container.has(e.target).length === 0){
            $('#dropdownToggle').prop('checked', false);
            //$('.langselect').trigger('click');
        }
    });
});
