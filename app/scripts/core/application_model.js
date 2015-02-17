lstb.App = Backbone.Model.extend({
	_didScroll: false,

	initialize: function () {

		var that = this,
			lstb = window.lstb;

		this.dataStorage 	= new lstb.DataStorage;
		lstb.dataStorage 	= this.dataStorage;

		this.statistic = new lstb.Statistic;

		this.router = new lstb.Router;
		this.pages 	= new lstb.PagesCollection;


		// Pages create
		// 404 page
		this.pages.add(new lstb.Page({
			name:'404',
			template:'pages/404-page'
		}));

		this.pages.add(new lstb.Page({
			name:'403',
			template:'pages/403-page'
		}));

		this.explore = new lstb.ExplorePage({
			name: 'explore',
			template: 'pages/explore-page'
		});
		this.pages.add(this.explore);

		this.post = new lstb.PostPage({
			name: 'photo',
			template: 'pages/post-page'
		});
		this.pages.add(this.post);

		// Pages render on route
		this.router.on('404', function () {
			that.pages.getPage('404').render();
		});

		this.router.on('route', function (router, route, params) {
			console.log('route:' + router);

			if(this.router.route_passed > 1) {
				this.statistic.trackCurrentPageChange();
			}
			
			lstb.trigger('route', router, route, params);

			switch (router) {
				case 'explore':
					this.explore.render();
					break;

				case 'post':
					this.post.render({
						key:   route[0],
						action:   route[1]
					});
					break;

				default:
					if(!!route[0] && !this.router.previousWasPopup()) {
					}
					break;
			}

			this.trigger('need:meta:update');
		}, this);

		

		

		// Clear pages - sleep
		this.router.on('reset', function (prev_route, dest_route) {
			console.log(prev_route, dest_route)

			if(!this.router.isPopup(dest_route)) {
				if(!this.router.isPopup(prev_route)) {
					// Magic scroll to top onchange page
					lstb.speedScrollTop(0, 1);
				}

				switch (prev_route) {
					case 'explore':
						console.log('reset:explore');
						this.explore.sleep();
						break;

					case 'post':
						console.log('reset:explore');
						this.explore.sleep();
						break;

					default:
						break;
				}
			}

			// every page sleeps when we quit popup
			if(this.router.isPopup(prev_route)) {
				_.forEach(this.pages.models, function(page, i) {
					if(!!page.sleep && page.get('name') != dest_route) {
						page.sleep();
					}
				})
			}

		}, this);


		lstb.on('historyback', function(){
			// TODO: mess with double popups
			if(!lstb.app.router.previousWasPopup()) {
				lstb.navigate(this.router.back_path, {trigger: true});
			} else {
				lstb.navigate('/photofeed', {trigger: true});
			}
		}, this);


		lstb.on('historyback:reload', function(){
			lstb.trigger('historyback');
			window.location.reload();
		}, this);
		



		/**
		 * Global event list
		 */

		/**
		 * Global event casting
		 */
		

		/**
		 * Scroll handler
		 */
		var $win = $(window),
			$doc = $(document);

		$(window).scroll(function(){
			var s_top = $win.scrollTop(),
				d_h = $doc.height(),
				w_h = $win.height();
			lstb.trigger('scroll', {
				s_top: s_top,
				d_h: d_h,
				w_h: w_h
			});
			if( s_top+150 >= (d_h - w_h) ) {
				lstb.trigger('pagebottom:reached');
			}
		});


		/**
		 * APPLICATION READY
		 */
		lstb.trigger('app:init');
	}
});
