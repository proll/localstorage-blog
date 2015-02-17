lstb.ExplorePageView = lstb.PageView.extend({
	addList: function (model) {
		this.$el.find('.postitem-list-col').html(model.view.$el);
	}
});