$(document).ready(function(){

	$('.input').keyup(function(){

		var input = makeSortString($('.input').val()).toLowerCase().trim();
		var counter = 0;

		$('.list ul li').each(function(){
			if ($(this).attr('id') == colourCountry(input)){
				if (!$(this).hasClass('correct')){
					$(this).removeClass('incorrect');
					$(this).addClass('correct');
					counter = (parseInt($('.scoreMunicipality').text()) + 1);
					var test = colourCountry(input);
					$('path[gem="'+test+'"]').css('fill', '#64f4a0');
					$('circle[gem="'+test+'"]').css('fill', '#64f4a0');
					$('.scoreMunicipality').text(counter);
					$('.input').val('');
				}
			}
		});
	});

	$('.scoreMunicipality').bind("DOMSubtreeModified",function(){
		if($('.score').text() == "390"){
			var score = $('.timer').text();
			endscreen("win");
		}
	});

});