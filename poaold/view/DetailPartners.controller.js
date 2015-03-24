sap.ui.controller("view.DetailPartners", {

	/**
	 * Initializes this controller
	 */
	onInit : function () {
		
		// subscribe for refresh events
		var bus = sap.ui.getCore().getEventBus();
		bus.subscribe("app", "RefreshDetail", this._refresh, this);
	},
	handlePartnerItemPress : function (evt) {
		alert ("Partner Pressed");
		sap.ui.getCore().getEventBus().publish("nav", "to", {
			id : "OperationItem",
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