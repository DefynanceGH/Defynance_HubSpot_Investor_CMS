/*!
 * Developed by GiantFocal
 * https://www.giantfocal.com/
*/

$(function(){
	
  window.headerHeight = $('header').outerHeight();
  window.footerHeight = $('.footer').outerHeight();
	window.windowWidth = $(window).width();
	window.windowHeight = $(window).height();
	
	
	// ------------- Mobile Nav -----------------
	$('.atmc-header_menu').addClass('js-enabled');

	/* Mobile button with three lines icon */
	$('.atmc-header_menu .hs-menu-wrapper').before('<button class="atmc-mobile-trigger hamburger hamburger--squeeze" type="button" aria-label="Open Mobile Menu"><span class="hamburger-box"><span class="hamburger-inner"></span></span></button>');
  
	$('.atmc-mobile-trigger').click(function(){
		$(this).toggleClass('is-active');
	});
  

	$('.atmc-header_menu .flyouts .hs-item-has-children > a').after(' <div class="child-trigger"><i></i></div>');
	$('.atmc-mobile-trigger').click(function() {
		$(this).next('.atmc-header_menu .hs-menu-wrapper').slideToggle(250);
		$('body').toggleClass('mobile-open');
		$('.child-trigger').removeClass('child-open');
		$('.hs-menu-children-wrapper').slideUp(250);
		return false;
	});

	$('.child-trigger').click(function() {
		$(this).parent().siblings('.hs-item-has-children').find('.child-trigger').removeClass('child-open');
		$(this).parent().siblings('.hs-item-has-children').find('.hs-menu-children-wrapper').slideUp(250);
		$(this).next('.hs-menu-children-wrapper').slideToggle(250);
		$(this).next('.hs-menu-children-wrapper').children('.hs-item-has-children').find('.hs-menu-children-wrapper').slideUp(250);
		$(this).next('.hs-menu-children-wrapper').children('.hs-item-has-children').find('.child-trigger').removeClass('child-open');
		$(this).toggleClass('child-open');
		return false;
	});
	
	
	// ------------- Header Padding Top -----------------
  
	function paddingTop() {
		var firstDNDSection = $('.body-container > div > div > div > .dnd-section:first-child');
		if (firstDNDSection.find('.atmc-hero').length) {
			var firstHero = firstDNDSection.find('.atmc-hero');
			var paddingTop = parseInt(firstHero.css('padding-top')) + window.headerHeight;
			firstHero.css('padding-top', paddingTop + 'px');
		} else {
			if ($('.atmc-body-header-default').length) {
				$('.body-wrapper').css('padding-top', window.headerHeight + 'px');
			}
		}

		if ($('body').hasClass('atmc-body-header-transparent')) {
			if (firstDNDSection.hasClass('.atmc-hero').length) {
			} else {
				var paddingTop = parseInt(firstDNDSection.css('padding-top')) + window.headerHeight;
				firstDNDSection.css('padding-top', paddingTop + 'px');
			}
		}
	}
	
	paddingTop();
	
  // ------------- Matchheight -----------------
  $('.atmc-matchheight-parent').each(function(){
    $(this).find('.atmc-matchheight-child').matchHeight({
      byRow: true,
      property: 'height',
      target: null,
      remove: false
    });
  });

  $('.atmc-matchheight-child').each(function(){
    var parent = $(this).parents('.dnd-section');
    if (parent.hasClass('atmc-matchheight-parent')) {
      
    } else {
      parent.addClass('atmc-matchheight-parent');
    }
  });


	// ------------- Animation -----------------
	{% if theme.components_group.animation_toggle == 'true' %}
		if ( !$('html').hasClass('hs-inline-edit') ) {
			ScrollReveal().reveal('.fadeInLeft', { 
				duration: 500,
				origin: 'left',
				distance: '50px',
				interval: 110,
				viewOffset: {
					top: -60
				}
			});
			ScrollReveal().reveal('.fadeInTop', { 
				duration: 500,
				origin: 'top',
				distance: '50px',
				interval: 110,
				viewOffset: {
					top: -60
				}
			});
			ScrollReveal().reveal('.fadeInRight', { 
				duration: 500,
				origin: 'right',
				distance: '50px',
				interval: 110,
				viewOffset: {
					top: -60
				}
			});
			ScrollReveal().reveal('.fadeInBottom', { 
				duration: 500,
				origin: 'bottom',
				distance: '50px',
				interval: 110,
				viewOffset: {
					top: -60
				}
			});
		}
	{% endif %}

  // ------------- Hide Horizontal Spacer on Mobile -----------------
  $('.hs_cos_wrapper_type_space').each(function(){
    $(this).closest('.widget-type-cell').addClass('hidden-phone');
  });
	
  // ------------- Headlines -----------------
  $('.atmc-headline-01, .atmc-headline-04').each(function(){
	  $(this).wrapInner('<strong></strong>');
	});
	
  // ------------- Global Slick Slider -----------------
	$(function(){
		$('.atmc-slider').each(function(){
			var items = $(this).data('slider-item');
			var autoplay = $(this).data('slider-autoplay');
			var autoplaySpeed = $(this).data('slider-autoplayspeed');
			var dots = $(this).data('slider-dots');
			var arrows = $(this).data('slider-arrows');
			var fade = $(this).data('slider-fade');
			var infinite = $(this).data('slider-infinite');
			$(this).slick({
				infinite: infinite,
				slidesToShow: items,
				slidesToScroll: 1,
				fade: fade,
				speed: 1000,
				autoplay: autoplay,
				dots: dots,
				arrows: arrows,
				autoplaySpeed: autoplaySpeed,
				responsive: [
					{
						breakpoint: 992,
						settings: {
							slidesToShow: 2,
							arrows: false
						}
					},
					{
						breakpoint: 576,
						settings: {
							slidesToShow: 1,
							arrows: false
						}
					}
				]
			});
		});
	});
	
	$(window).load(function(){
		$('.atmc-slick, .atmc-slider').css('opacity', 1);
	});
	
  // ------------- Global Sticky in Parent -----------------
	$(window).load(function(){
		if (window.windowWidth > 767) {
			setTimeout(function(){
				$('.atmc-sticky').closest('.dnd-column').addClass('atmc-sticky-parent');
				$('.atmc-sticky').stick_in_parent({
					parent: ".atmc-sticky-parent",
					offset_top: window.headerHeight
				});
			}, 500);
		}
	});
	
	// ------------- Scroll to Div -----------------
	$('a[href*="#"]')
		// Remove links that don't actually link to anything
		.not('[href="#"]').not('.atmc-popup')
		.not('[href="#0"]')
		.click(function(event) {
			// On-page links
			if (
				location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
				&& 
				location.hostname == this.hostname
			) {
				// Figure out element to scroll to
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
				// Does a scroll target exist?
				if (target.length) {
					// Only prevent default if animation is actually gonna happen
					event.preventDefault();
					$('html, body').animate({
						scrollTop: target.offset().top
					}, 1000, function() {
						// Callback after animation
						// Must change focus!
						var $target = $(target);
						$target.focus();
						if ($target.is(":focus")) { // Checking if the target was focused
							return false;
						} else {
							$target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
							$target.focus(); // Set focus again
						};
					});
				}
			}
		});
	
	// ------------- Sticky Header -----------------
	$(window).scroll(function() {
		if ($(document).scrollTop() > headerHeight*2) {
			$('.atmc-header').addClass('sticky');
		}
		else {
			$('.atmc-header').removeClass('sticky');
		}
	});
	
	var previousScroll = window.windowHeight;
	
	$(window).scroll(function () {
		var currentScroll = $(this).scrollTop();
		if (currentScroll > window.headerHeight) {
				if (currentScroll > previousScroll) {
						$('.atmc-header').css("margin-top", "-" +window.headerHeight+"px");
				} else {
						$('.atmc-header').css("margin-top", "0");
				}
		} 
		previousScroll = currentScroll;
	});
	
	
	// ------------- Scroll to Top -----------------
	$(".atmc-scroll-top").on('click', function() {
		$("html, body").animate({ scrollTop: 0 }, "slow");
		return false;
	});
	
	// ------------- Scroll to Div -----------------
	$(".atmc-scroll-to, .atmc-smooth-scroll").on('click', function() {
		var target = $(this).closest('.dnd-section').next('.dnd-section');
		$('html, body').animate({
			scrollTop: $(target).offset().top
		}, 800);
	});
	
	// ------------- Search Popup -----------------
	$(function(){
		$('.atmc-header-01_search_trigger').on('click', function(){
			$('.atmc-header-01_search').addClass('atmc-header-01_search_active');
		});
		$('.atmc-header-01_search_close').on('click', function(){
			$('.atmc-header-01_search').removeClass('atmc-header-01_search_active');
		});
	});
	
	// ------------- Global Slick Slider Thumbnail and Parent -----------------
	$(function(){
		$(".atmc-slider-thumbnail").each(function(){
			var parent = $(this).find('.atmc-slider-parent');
			var thumbnail = $(this).find('.atmc-slider-thumb');
			parent.slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
				dots: false,
				fade: true,
				speed: 1000,
				asNavFor: thumbnail
			});
			thumbnail.slick({
				slidesToShow: 3,
				slidesToScroll: 1,
				asNavFor: parent,
				dots: false,
				arrows: false,
				speed: 1000,
				centerMode: false,
				focusOnSelect: true
			});
		});
	});
	
	// ------------- Global Magnific Popup -----------------
	$(function() {
		$('.atmc-popup').magnificPopup({
			type: 'inline',
			fixedContentPos: false,
			fixedBgPos: true,
			overflowY: 'auto',
			closeBtnInside: true,
			preloader: false,
			midClick: true,
			removalDelay: 300,
			mainClass: 'my-mfp-zoom-in'
		});
	});
	
});
