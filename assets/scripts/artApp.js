'use strict';

jQuery(function($) {
	var ArtApp = {
		gridID: '#image-grid',
		jsondata : {},
		modalID : 'artModal',

		init: function(){
			$(document).foundation();

			var $grid = $(this.gridID).masonry({
				itemSelector: this.gridID + ' li'
			});

			ArtApp.imageBlocks();
		},

		reloadMasonry: function(){
			$(this.gridID).masonry('reloadItems');
			$(this.gridID).masonry();
		},

		showImages: function(){
			var that = this;
			$(this.gridID + ' img').on('load', function() {
		    	$(this).closest('li').addClass('loaded');
		    	$(this).fadeIn(600);
		    	that.reloadMasonry();
			});
		},

		setModals: function(){
			var that = this;

			$('[data-reveal-id]').on('click', function() {
			  var targetModal = $('#' + $(this).data('revealId'));
			  var key = $(this).data('imgkey');
			  $('#' + that.modalID + ' img').attr('src', '/images/pottery/' + that.jsondata[key].filename);
			  $('#' + that.modalID + ' #modal-caption').text(that.jsondata[key].desc);
			  $('#' + that.modalID + ' #modal-title').text(that.jsondata[key].title);
			});
		},

		imageBlocks: function(){
			var that = this;


			$.getJSON( '/data/pottery.json', function(data) {
				$.each(data, function( key, val ) {
			  		$(that.gridID).append('<li><a href="#" data-reveal-id="' + that.modalID + '" data-imgkey="'+ key +'""><img src=/images/pottery/' + val.filename + '></a></li>');
				});
				that.jsondata = data;
			}).done(function(){
				that.showImages();
				that.setModals();
			});


		}
	}
	ArtApp.init();
});
