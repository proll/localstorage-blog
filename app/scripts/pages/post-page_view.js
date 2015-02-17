lstb.PostPageView = lstb.PageView.extend({

	addPost: function (model) {
		this.$el.find('.post-page-row').html(model.view.$el);
	},

	remove: function() {
		this.model.off(null,null,this);

		this.undelegateEvents();
	}
});