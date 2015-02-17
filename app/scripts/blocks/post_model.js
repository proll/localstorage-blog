lstb.Post = Backbone.Model.extend({
	url: "post",
	defaults: {
		key: 0,
		action: 'view',
		content: '',
		title: '',
		can_edit: false
	},

	initialize: function (options) {
		this.view = new lstb.PostView({model:this});
		this.on("load:success", this.init, this);
	},


	init: function () {
		this.trigger('post:ready');
	},

	fetch: function (options) {
		var resp = lstb.dataStorage.getData(this.get('key'));
		if(resp) {
			this.success(this, resp);
		} else {
			this.error(this)
		}
	},

	success: function (model, response, options) {
		response = _.toJSON(response);
		this.set(response);
		if(!response.error) {
			this.trigger("load:success");
		} else {
			lstb.error('Post', response.error);
			this.trigger("load:error");
		}
	},

	error: function (model, xhr, options) {
		lstb.error('Post', 'request');
		this.trigger("load:error")
	},

	reset: function () {
		return false;
	},

	save: function() {
		console.log(this.toJSON());
		console.log('save');
	},

	activate: function() {
		this.set("sleeped", false);
		if(this.get('action') === 'edit') {
			this.set('can_edit', true);
			this.fetch();
		} else if(this.get('action') === 'add'){
			this.set('can_edit', true);
			this.set('key', Date.now());
			this.trigger('load:start');
			this.trigger('load:success');
		} else {
			this.set('can_edit', false);
			this.fetch();
		}
	},

	sleep: function() {
		this.set("sleeped", true);
	},

	remove: function () {
		this.stopListening();
		this.clear({silent: true});
		this.view.remove();
	},
});