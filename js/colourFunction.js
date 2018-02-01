$(document).ready(function(){

	$('.input').keyup(function(){

		var input = makeSortString($('.input').val()).toLowerCase().trim();
		var counter = 0;

		$('.list ul li').each(function(){
			if ($(this).attr('id') == colourCountry(input)){
				if (!$(this).hasClass('correct')){
					$(this).removeClass('incorrect');
					$(this).addClass('correct');
					counter = (parseInt($('.score').text()) + 1);
					var test = colourCountry(input);
					$('path[path-identifier="'+test+'"]').css('fill', '#64f4a0');
					$('circle[path-identifier="'+test+'"]').css('fill', '#64f4a0');
					$('.score').text(counter);
					$('.input').val('');
				}
			}
		});
	});

});