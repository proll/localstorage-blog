lstb.PostItem = Backbone.Model.extend({
	defaults: {
		title: '',
		content: '',
		key: 0,
	},
	initialize: function (options) {
		this.view = new lstb.PostItemView({model:this});
	},
	fetch: function () {
		this.view.render();
	},

	remove: function () {
		this.stopListening();
		this.clear({silent: true});
		this.view.remove();
	}
});