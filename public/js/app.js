

jQuery(function($) {
	var utils = {
		init: function(){

			var images = ['boston.jpg', 'barcelonaFood.jpg', 'whitney.jpg', 'boston.jpg', 
						  'gurnsey.jpg', 'ireland.jpg', 'monetsHouse.jpg'];

			var $heroImage = $('.hero-image img'),
				$imageContainer = $('.hero-image'),
				$topText = $('.top-block');

			//$(".hero-image").css({'background-image': 'url(images/backgroundImages/' + images[Math.floor(Math.random() * images.length)]+')'});
		
			$heroImage.attr('src', 'images/backgroundImages/'+ images[Math.floor(Math.random() * images.length)]);
		
			$(".hero-image img").on('load', function(){
					$imageContainer.addClass("loaded");
					$('body').removeClass('overflow-hidden');
					$heroImage.fadeIn(600);
					$topText.fadeIn(600);
			})

			utils.backgroundResize();

			$(window).resize(function(){
				utils.backgroundResize();
			});
		},

		backgroundResize : function(){
			//console.log('backgroundResize');
			var height = $(window).height();
			var width = $(window).width();

			if ((width/height) <= 1.33333333){
					$(".hero-image img").removeClass("wider");
			}
			else {
				$(".hero-image img").addClass("wider");
			}
		}
	}

	utils.init();
});


