var artPage = {
	gridID: '#image-grid',
	jsondata : {},
	modalID : 'artModal',

	init: function(){
		this.$grid = document.querySelector(this.gridID);

		that = this;

		this.msnry = new Masonry(that.$grid, {
			itemSelector: this.gridID + ' li'
		});

		this.imageBlocks();

		window.onresize = function(){
			that.msnry.reloadItems();
		};
  },

	showImages: function(){
		var that = this;
		var gridImages = document.getElementsByClassName("js-grid-img");

		for (var i = 0; i < gridImages.length; i++) {
			gridImages[i].addEventListener("load", function(){
				this.parentNode.parentNode.classList.add("is-loaded");
				this.classList.add("is-shown");
			});
		}
	},

	setImageElements (data){

		for (var key in data){
			 var filename = data[key].filename;

			 var listItem = document.createElement("li");
			 listItem.classList.add("image-grid-item");

			 var listItemImg = document.createElement("img");
			 listItemImg.setAttribute("src", "./assets/" + filename);
			 listItemImg.classList.add("js-grid-img");
			 listItemImg.classList.add("opacity-transition");

			 listItem.appendChild(listItemImg);
			 this.$grid.appendChild(listItem);

			 this.msnry.reloadItems();
			 console.log(this.msnry.reloadItems);

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
		  } else {
				alert("There's been an issue with the images, try refreshing the page");
		  }
		};

		request.onreadystatechange = function () {
		  if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
				that.msnry.reloadItems();
			}
		}

		request.onerror = function() {
			alert("There's been an issue with the images, try refreshing the page");
		};

		request.send();
	}
}

artPage.init();
