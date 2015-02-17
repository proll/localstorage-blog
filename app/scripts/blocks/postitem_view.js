lstb.PostItemView = Backbone.View.extend({
	template: "blocks/postitem",
	tagName: "div",
	className: "postitem",

	initialize: function(options){
		this.template = lstb.Templates.get(this.template);
	},

	render: function(){
		var template = this.template(this.model.toJSON());
		this.$el.html(template);
	}
});

