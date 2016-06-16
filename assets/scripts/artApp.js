var artPage = {
	gridID: '#image-grid',
	gridItemClass: '.image-grid-item',
	jsondata : {},
	modalID : 'artModal',

	init: function(){
		that = this;

		this.$grid = document.querySelector(this.gridID);
		this.imageBlocks();

		var debouncedMasonryReset = this._debounce(function() {
			that.msnry.layout();
		}, 300);

		window.addEventListener('resize', debouncedMasonryReset);

  },


	removeSelectedClass: function() {
		var selected = document.querySelectorAll("#image-grid .is-selected");

		for (var i = 0; i < selected.length; i++) {
			selected[i].classList.remove('is-selected');
			that.msnry.layout();

		}
	},

	imageSelect: function() {
		var gridItems = document.getElementsByClassName("js-image-grid-item");

		for (var i = 0; i < gridItems.length; i++) {
			gridItems[i].addEventListener("click", function(){
				that.removeSelectedClass();
				this.classList.add("is-selected");
				that.msnry.layout();
			});
		}
	},

	showImages: function(){
		var that = this;
		var gridImages = document.getElementsByClassName("js-grid-img");

		for (var i = 0; i < gridImages.length; i++) {
			gridImages[i].addEventListener("load", function(){
				this.parentNode.parentNode.classList.add("is-loaded");
				this.classList.add("is-shown");
				that.msnry.layout();
			});
		}
	},

	setImageInfo(_title, _description) {

		var title = document.createElement("h4");
		title.innerText = _title;

		var description = document.createElement("p");
		description.innerText = _description;


		var info = document.createElement("div");
		info.classList.add("image-grid-item-desc");

		info.appendChild(title);
		info.appendChild(description);

		return info;
	},

	setImageElements (data){

		this.msnry = new Masonry('#image-grid', {
			itemSelector: '.image-grid-item',
			percentPosition: true
		});

		var that = this;

		for (var key in data){
			 var filename = data[key].filename;

			 var listItem = document.createElement("li");
			 listItem.classList.add("image-grid-item");
			 listItem.classList.add("js-image-grid-item");

			 var listItemImg = document.createElement("img");
			 listItemImg.setAttribute("src", "./assets/" + filename);
			 listItemImg.classList.add("js-grid-img");
			 listItemImg.classList.add("opacity-transition");

			 var info = that.setImageInfo(data[key].title, data[key].desc);

			 listItem.appendChild(listItemImg);
			 listItem.appendChild(info);


			 that.$grid.appendChild(listItem);

			 that.msnry.appended(listItem);
			 that.msnry.layout();
		 }
	},

	imageBlocks: function(){
		var that = this;
		var request = new XMLHttpRequest();

		request.open('GET', './data/pottery.json', true);

		request.onload = function() {
		  if (request.status >= 200 && request.status < 400) {
		    var data = JSON.parse(request.responseText);

				that.jsondata = data;
				that.setImageElements(data);
				that.showImages();
				that.msnry.layout();

				that.imageSelect();

		  } else {
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
