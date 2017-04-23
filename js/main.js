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

	var lastTouchY = 0;
	var preventPullToRefresh = true;

	$('html').on('touchstart', function (e) {
	    if (e.originalEvent.touches.length != 1) { return; }
	    lastTouchY = e.originalEvent.touches[0].clientY;
	    preventPullToRefresh = window.pageYOffset == 0;
	});

	$('html').on('touchmove', function (e) {
	    var touchY = e.originalEvent.touches[0].clientY;
	    var touchYDelta = touchY - lastTouchY;
	    lastTouchY = touchY;
	    if (preventPullToRefresh) {
		// To suppress pull-to-refresh it is sufficient to preventDefault the first overscrolling touchmove.
		preventPullToRefresh = false;
		if (touchYDelta > 0) {
		    e.preventDefault();
		    return;
		}
	    }
	});

	// document.addEventListener("touchstart", function(){}, true);

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

    $(document).mouseup(function (e){
        var container = $(".langselect");

        if (!container.is(e.target) && container.has(e.target).length === 0){
            $('#dropdownToggle').prop('checked', false);
            //$('.langselect').trigger('click');
        }
    });
});
