
var artPage = {
	gridID: '#image-grid',
	jsondata : {},
	modalID : 'artModal',

	init: function(){
		// $(document).foundation();

		this.$grid = document.querySelector(this.gridID);

		that = this;

		this.msnry = new Masonry( that.$grid, {
			itemSelector: this.gridID + ' li'
		});

		this.imageBlocks();
	},


	setModals: function(){
		// var that = this;
		//
		// $('[data-reveal-id]').on('click', function() {
		//   var targetModal = $('#' + $(this).data('revealId'));
		//   var key = $(this).data('imgkey');
		//   $('#' + that.modalID + ' img').attr('src', '/images/pottery/' + that.jsondata[key].filename);
		//   $('#' + that.modalID + ' #modal-caption').text(that.jsondata[key].desc);
		//   $('#' + that.modalID + ' #modal-title').text(that.jsondata[key].title);
		// });
	},

	showImages: function(){
		var that = this;
		var gridImages = document.getElementsByClassName("js-grid-img");

		for (var i = 0; i < gridImages.length; i++) {
			gridImages[i].addEventListener("load", function(){
				this.parentNode.parentNode.classList.add("is-loaded");
				this.classList.add("is-shown");

				that.msnry.reloadItems();
			});
		}
	},

	setImageElements (data){
		for (var key in data){
			 var filename = data[key].filename;
			 var listItem = document.createElement("li");

			 var listItemLink = document.createElement("a");
			 listItemLink.href = "#";
			 listItemLink.setAttribute("data-reveal-id", that.modalID);
			 listItemLink.setAttribute("data-imgkey", key);

			 var listItemImg = document.createElement("img");
			 listItemImg.setAttribute("src", "./assets/" + filename);
			 listItemImg.classList.add("js-grid-img");
			 listItemImg.classList.add("opacity-transition");

			 listItemLink.appendChild(listItemImg);

			 listItem.appendChild(listItemLink);

			 that.$grid.appendChild(listItem);
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
				that.setModals();

		  } else {
				alert("There's been an issue with the images, try refreshing the page");
		  }
		};

		request.onerror = function() {
			alert("There's been an issue with the images, try refreshing the page");
		};

		request.send();
	}
}

artPage.init();


// 'use strict';
//
// jQuery(function($) {
// 	var ArtApp = {
// 		gridID: '#image-grid',
// 		jsondata : {},
// 		modalID : 'artModal',
//
// 		init: function(){
// 			$(document).foundation();
//
// 			var $grid = $(this.gridID).masonry({
// 				itemSelector: this.gridID + ' li'
// 			});
//
// 			ArtApp.imageBlocks();
// 		},
//
// 		reloadMasonry: function(){
// 			$(this.gridID).masonry('reloadItems');
// 			$(this.gridID).masonry();
// 		},
//
// 		showImages: function(){
// 			var that = this;
// 			$(this.gridID + ' img').on('load', function() {
// 		    	$(this).closest('li').addClass('loaded');
// 		    	$(this).fadeIn(600);
// 		    	that.reloadMasonry();
// 			});
// 		},
//
// 		setModals: function(){
// 			var that = this;
//
// 			$('[data-reveal-id]').on('click', function() {
// 			  var targetModal = $('#' + $(this).data('revealId'));
// 			  var key = $(this).data('imgkey');
// 			  $('#' + that.modalID + ' img').attr('src', '/images/pottery/' + that.jsondata[key].filename);
// 			  $('#' + that.modalID + ' #modal-caption').text(that.jsondata[key].desc);
// 			  $('#' + that.modalID + ' #modal-title').text(that.jsondata[key].title);
// 			});
// 		},
//
// 		imageBlocks: function(){
// 			var that = this;
//
//
// 			$.getJSON( '/data/pottery.json', function(data) {
// 				$.each(data, function( key, val ) {
// 			  		$(that.gridID).append('<li><a href="#" data-reveal-id="' + that.modalID + '" data-imgkey="'+ key +'""><img src=/images/pottery/' + val.filename + '></a></li>');
// 				});
// 				that.jsondata = data;
// 			}).done(function(){
// 				that.showImages();
// 				that.setModals();
// 			});
//
//
// 		}
// 	}
// 	ArtApp.init();
// });
