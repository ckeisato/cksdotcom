
var indexPage = {
	init: function(){
		this.initImages();

		this.backgroundResize();

		window.onresize = function(){
			indexPage.backgroundResize();
		};
	},

	initImages() {
		var images = ['boston.jpg', 'barcelonaFood.jpg', 'whitney.jpg', 'boston.jpg',
									'gurnsey.jpg', 'ireland.jpg', 'monetsHouse.jpg'];

		var $imageContainer = document.querySelector('.hero-image'),
				$topText = document.querySelector('.top-block'),
				$body = document.body;

		this.$heroImage = document.querySelector('.hero-image img');

		var imagePath = 'assets/backgroundImages/'+ images[Math.floor(Math.random() * images.length)];

		this.$heroImage.src = imagePath

		this.$heroImage.addEventListener("load", function(){
			$imageContainer.classList.add("loaded");
			$body.classList.remove("overflow-hidden");

			// need to do this with animation css
			// $heroImage.fadeIn(600);
			// $topText.fadeIn(600);
		});
	},

	backgroundResize : function(){
		var height = window.innerHeight;
		var width = window.innerWidth;

		var that = this;

		if ((width/height) <= 1.33333333){
			that.$heroImage.classList.remove("wider");
		}
		else {
			that.$heroImage.classlist.add("wider");
		}
	}
}

indexPage.init();
