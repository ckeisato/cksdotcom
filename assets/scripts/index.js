var indexPage = {
	offsetArray: [],

	init: function(){
		this.fadeOutPanels = document.querySelectorAll('.js-fade-out');

		var debouncedResize = this._debounce(this.mapScrollPoints.bind(this), 300);
		window.addEventListener('resize', debouncedResize);

		this.mapScrollPoints();
		this.initFade();
	},

	initFade: function() {
		var that = this;
		window.addEventListener('scroll', function() {
		  var windowInnerHeight = window.innerHeight;
		  var opacity = 1 - ((window.scrollY % windowInnerHeight) / windowInnerHeight);
		  var topItem = that.getTopPanel();
		  topItem.style.opacity = opacity;
		});
	},

	// returns the div at the top
	getTopPanel: function() {		
		var currOffset = window.scrollY;

		if (currOffset < this.offsetArray[1]) {
			return this.fadeOutPanels[0];
		}
		else if (currOffset < this.offsetArray[2]) {
			return this.fadeOutPanels[1];
		}
		else {
			return this.fadeOutPanels[2];
		}
	},

	mapScrollPoints: function() {
		var _offsetArray = [];

		var contentPanels = this.fadeOutPanels;
		contentPanels.forEach(function(panel){
			_offsetArray.push(panel.offsetTop);
		});

		this.offsetArray = _offsetArray;
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
