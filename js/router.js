define([

	"jquery",
	"underscore",
	"backbone",
	"utils",

	"views/playlist_collection",
	"views/playlist_item_collection"

], function($, _, Backbone, Utils, PlaylistCollectionView, PlaylistItemCollectionView) {
	
	var Router = Backbone.Router.extend({

		routes: {
			"pid/:pname::pid": "playlist_select",
			"*path": "default_route"
		},

		render: function (view, options) {
			if (this.currentView) { this.currentView.$el.unbind(); }

			view = new view(options);
			view.render();
			
			this.currentView = view;
		}
	});
	
	Router.initialize = function() {

		var router = new Router;
		
		router.on("route:playlist_select", function(pname, pid) {
			this.render(PlaylistItemCollectionView, { pname: pname, pid: pid });
		});

		router.on("route:default_route", function() {
			var self = this;

			if (!localStorage.playlists && Utils.cookie.get("access_token"))
			$("#msg_load").fadeIn(function() { self.render(PlaylistCollectionView); });
			else 
			this.render(PlaylistCollectionView);
		});

		Backbone.history.start();
	};
	
	return Router;
});
