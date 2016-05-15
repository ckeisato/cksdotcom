
var indexPage = {
	init: function(){
		this.initImages();

		this.backgroundResize();

		window.onresize = function(){
			indexPage.backgroundResize();
		};
	},

	initImages: function() {
		var images = ['boston.jpg', 'barcelonaFood.jpg', 'whitney.jpg', 'boston.jpg',
									'gurnsey.jpg', 'ireland.jpg', 'monetsHouse.jpg'];

		var $imageContainer = document.querySelector('.hero-image'),
				$topText = document.querySelector('.hero-image-text'),
				$body = document.body;

		this.$heroImage = document.querySelector('.hero-image img');

		var imagePath = 'assets/'+ images[Math.floor(Math.random() * images.length)];

		this.$heroImage.src = imagePath

		this.$heroImage.addEventListener("load", function(){
			$imageContainer.classList.add("loaded");
			$body.classList.remove("overflow-hidden");
			$topText.classList.add("is-shown");
			this.classList.add("is-shown");
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
			that.$heroImage.classList.add("wider");
		}
	}
}

indexPage.init();
