
var indexPage = {
	init: function(){
		this.initImages();
		this.backgroundResize();

		var debouncedResize = this._debounce(this.backgroundResize.bind(this), 300);
		window.addEventListener('resize', debouncedResize);
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
	},

	// underscore debounce function
	// @todo: find a better way to use this across the two pages
	_debounce : function(func, wait, immediate) {

		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};

			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	}
}

indexPage.init();
