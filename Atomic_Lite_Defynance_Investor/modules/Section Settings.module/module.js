// Overlay
$(function(){
	$('.atmc-overlay-module').each(function(){
		$(this).closest('.dnd-section').addClass('atmc-overlay-parent').append($(this));
	});
});

// Smooth Scroll
$(function(){
	$('.atmc-smooth-scroll').each(function(){
		$(this).closest('.dnd-module').addClass('atmc-smooth-scroll-parent');
	});
});