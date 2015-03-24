sap.ui.controller("view.DetailObjects", {

	/**
	 * Initializes this controller
	 */
	onInit : function () {
		
		// subscribe for refresh events
		var bus = sap.ui.getCore().getEventBus();
		bus.subscribe("app", "RefreshDetail", this._refresh, this);
	},
	handleObjectItemPress : function (evt) {
	
		sap.ui.getCore().getEventBus().publish("nav", "to", {
			id : "ObjectItem",
			data : {
				context : evt.getSource().getBindingContext()
			}
		});
	},	
	/**
	 * Refreshes the view
	 */
	_refresh : function (channelId, eventId, data) {
	
	}
});