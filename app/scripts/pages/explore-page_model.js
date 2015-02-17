lstb.ExplorePage = lstb.Page.extend({
	visited: false,
	defaults: {
		sleeped:    true
	},

	initialize: function(options){
		options 		= options || {};
	},

	needRerender: function(options) {
		return this.get('sleeped');
	},

	render: function(options) {
		if(!this.needRerender(options)) return false;

		if(!this.visited) {
			this.visited = true;
			this.view = new lstb.ExplorePageView({
				model: this, 
				template:"pages/explore-page"
			});
			this.list = new lstb.PostItemList();

			this.view.render();
			this.list.activate();
			this.view.addList(this.list);

			this.set('sleeped', false);
		} else {
			this.set(options);

			this.view.render();
			this.list.activate();
			this.view.addList(this.list);

			this.list.reset();
			this.set('sleeped', false);
		}

	},

	sleep: function () {
		if(this.get('sleeped')) return false;
		
		this.set('sleeped', true);

		this.list.sleep();
	}
});