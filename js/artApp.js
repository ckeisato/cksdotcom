var artPage = {

	init: function(){
		this.carousel = document.getElementById('image-carousel');
		this.getImageData();
  },

	initFlickity() {
		var carousel = this.carousel;
		var flkty = new Flickity(carousel, {
		  cellAlign: 'left',
		  cellSelector: '.image-carousel-item',
		  imagesLoaded: true,
		  adaptiveHeight: true
		});
	},

	setImages: function() {
		var data = this.jsondata;
		var that = this;

		for (var key in data){
			var filename = data[key].filename;

			var listItem = document.createElement("div");
			listItem.classList.add("image-carousel-item");
			listItem.classList.add("js-image-carousel-item");

			var listItemImg = document.createElement("img");
			listItemImg.setAttribute("src", "./assets/" + filename);
			listItemImg.classList.add("image-carousel-item-image");

			listItem.appendChild(listItemImg);
			that.carousel.appendChild(listItem);
		}

	},


	getImageData: function(){
		var that = this;
		var request = new XMLHttpRequest();

		request.open('GET', './data/pottery.json', true);

		request.onload = function() {
		  if (request.status >= 200 && request.status < 400) {
		    var data = JSON.parse(request.responseText);

				that.jsondata = data;
				that.setImages();
				that.initFlickity();

		  }
		  else {
				alert("There's been an issue with the images, try refreshing the page");
		  }
		};

		request.onerror = function() {
			alert("There's been an issue with the images, try refreshing the page");
		};

		request.send();
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

artPage.init();
