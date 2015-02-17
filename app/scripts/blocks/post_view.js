lstb.PostView = Backbone.View.extend({
	template: "blocks/post",
	tagName: "div",
	className: "post-row",


	events: {
		"click .post__save": "save",
		"keypress :input": "hideErrors",
		"submit .post__form": "submit"
	},

	initialize: function(options){
		this.template = lstb.Templates.get(this.template);

		this.model.on("load:success", this.render, this);
		this.model.on("change:sleeped", this.sleep, this);
	},

	render: function(){
		var template = this.template(this.model.toJSON());
		this.$el.append(template);

		this.$inputs = this.$el.find(':input');
		this.$title = this.$el.find('.post__title');
		this.$content = this.$el.find('.post__content');

		this.delegateEvents();
	},

	save: function(e) {
		if(e && e.preventDefault) {
			e.preventDefault();
		}
		this.hideErrors();
		var title = $.trim( this.$title.val() ),
			content = $.trim( this.$content.val() );

		if(!title) {
			this.showError(this.$title);
			return false;
		}

		if(!content) {
			this.showError(this.$content);
			return false;
		}

		this.model.save({
			title: title,
			content: content
		});
		return false
	},

	submit: function(e) {
		if(e && e.preventDefault) {
			e.preventDefault();
		}
		this.save();

		return false;
	},

	hideErrors: function() {
		this.$inputs.toggleClass('input_error', false);
	},

	showError: function($input) {
		$input.focus();
		$input.toggleClass('input_error', true);
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

