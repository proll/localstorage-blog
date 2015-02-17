lstb.PostView = Backbone.View.extend({
	template: "blocks/post",
	tagName: "div",
	className: "post-row",


	events: {
		"click .post__header>button": "save"
	},

	initialize: function(options){
		this.template = lstb.Templates.get(this.template);

		this.model.on("load:success", this.render, this);
		this.model.on("change:sleeped", this.sleep, this);
	},

	render: function(){
		var template = this.template(this.model.toJSON());
		this.$el.append(template);

		this.delegateEvents();
	},

	save: function() {
		this.model.save();
	},

	sleep: function(model, value, options) {
		if(value) {
			this.remove();
		}
	},

	remove: function(model, value, options) {
		this.undelegateEvents();
		// this.$el.html("");
	}
});

