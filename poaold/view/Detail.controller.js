jQuery.sap.require("sap.m.MessageToast");
jQuery.sap.require("sap.m.SelectDialog");

sap.ui.controller("view.Detail", {

	/**
	 * Called by the UI5 runtime to init this controller
	 */
	onInit : function () {
		
		// subscribe for refresh events
		var bus = sap.ui.getCore().getEventBus();
		bus.subscribe("app", "RefreshDetail", this._refresh, this);

	},

	/**
	 * Called by the UI5 runtime to cleanup this controller
	 */
	onExit : function () {
		if (this._recipientDialog) {
			this._recipientDialog.destroy();
			this._recipientDialog = null;
		}
		if (this._lineItemViewDialog) {
			this._lineItemViewDialog.destroy();
			this._lineItemViewDialog = null;
		}
	},

	/**
	 * Refreshes the model
	 */
	_refresh : function (channelId, eventId, data) {
		
		if (data && data.context) {
			
			// set context of selected master object
			this.getView().setBindingContext(data.context);
			
			var context = this.getView().getBindingContext();
			var oModel = new sap.ui.model.json.JSONModel({
				actionsEnabled : context && !!context.getObject()
			});
			this.getView().setModel(oModel, "cfg");
			
			// scroll to top of page
			this.getView().byId("page").scrollTo(0);
		}
	},

	handleSearch : function(oEvent) {
		var filter = [];
		var sVal = oEvent.getParameter("value");

		if(sVal && sVal.length > 0) {
			// create the local filter to apply
			var selectFilter = new sap.ui.model.Filter("LastName", sap.ui.model.FilterOperator.Contains , sVal);
			filter.push(selectFilter);
		}

		//Get the bound items
		var itemsBinding = oEvent.getParameter("itemsBinding");

		// and apply the filter to the bound items, and the Select Dialog will update
		itemsBinding.filter(filter);
	},

	/**
	 * Lazy loading of tab content
	 */
	handleTabSelect : function (evt) {
				var selectedDetail = this.getView().getBindingContext().getObject();
		//alert("zz"+selectedDetail.ID);
		var key = evt.getParameter("key");
		var item = evt.getParameter("item");
		var tabBar = evt.getSource();
		if (item.getContent().length === 0) {
			var view = new sap.ui.view({
				id : "tabView" + key,
				viewName : "view.Detail" + key,
				type : "XML"
			});
			item.addContent(view);
		}
	},

	handleLineItemPress : function (evt) {
		sap.ui.getCore().getEventBus().publish("nav", "to", {
			id : "LineItem",
			data : {
				context : evt.getSource().getBindingContext()
			}
		});
	},
	
	handleNavBack : function (evt) {
		sap.ui.getCore().getEventBus().publish("nav", "back");
	},

	handleNewJob : function (evt) {
	//alert("NewJobPressed");
		this._showNewJobDialog();
	},
	
		handleChange : function (oEvent) {
				var oSlider = oEvent.oSource;
				var fValue = oEvent.getParameter("value");
				
				var oTextView = oCore.getControl("TDuration");
				oTextView.setText( String(fValue) + " Mins");
				
			},
	
	/**
	 * Shows the approve or reject dialog
	 * @param {String} [mode] Allows to differ between APPROVE and REJECT mode
	 */
	_showNewJobDialog : function () {
		
		// to be on the safe side
		var selectedDetail = this.getView().getBindingContext().getObject();
		if (!selectedDetail) {
			return;
		}
		
		// get texts
		
		
		
		
		// create dialog
		var that = this;
var dialog = new sap.m.Dialog("NewJobForm", {
				title: "Create New Job",
				stretchOnPhone: true,
// 				icon: "images/SAPUI5Icon.png",
				
				content: [
					new sap.ui.core.HTML({content:"<h1 style='margin:0;padding: 0;'>Please enter the New Job Details?</h1>"}),
					new sap.ui.core.HTML({content:"<h3 style='margin:0;padding: 0;'>Estimated Duration</h3>"}),
					// new sap.m.Slider("sDuration",{
						// value: 0,
						// min: 0,
						// max: 120,
						// step: 5,
						// width: "50%",
						// progress : true,
						// change: this.handleChange,
						// livechange: this.handleChange
					// }),
					
					//new sap.ui.commons.TextView("TDuration", { text: "0", tooltip: "Duration", enabled: true}),

					//new sap.ui.core.HTML({content:"<h3 style='margin:0;padding: 0;'>Job Type</h3>"}),
					//JobTypeList,
					new sap.ui.core.HTML({content:"<h3 style='margin:0;padding: 0;'>Date</h3>"}),
					new sap.m.Input({type: sap.m.InputType.Date, dateFormat: "dd.MM.YYYY", width: "150px"}),

					
					new sap.ui.core.HTML({content:"<h3 style='margin:0;padding: 0;'>Time</h3>"}),
					new sap.m.Input({type: sap.m.InputType.Time, timeFormat: "hh:mm", width: "150px"}),
					new sap.ui.core.HTML({content:"<h3 style='margin:0;padding: 0;'>Equipment</h3>"}),
					new sap.m.Input({type: sap.m.InputType.Text,  width: "400px"}),
										new sap.ui.core.HTML({content:"<h3 style='margin:0;padding: 0;'>Equipment</h3>"}),
					new sap.m.Input({type: sap.m.InputType.Text,  width: "400px"}),
										new sap.ui.core.HTML({content:"<h3 style='margin:0;padding: 0;'>Functional Location</h3>"}),
					new sap.m.Input({type: sap.m.InputType.Text,  width: "400px"}),
										new sap.ui.core.HTML({content:"<h3 style='margin:0;padding: 0;'>Short Text</h3>"}),
					new sap.m.Input({type: sap.m.InputType.Text,  width: "400px"}),
															new sap.ui.core.HTML({content:"<h3 style='margin:0;padding: 0;'>Long Text</h3>"}),
					new sap.m.TextArea({rows: 4, width: "400px"})
				],
				leftButton: 
					new sap.m.Button({
						text: "Create",
						type: sap.m.ButtonType.Accept,
						tap : function() {
							dialog.close();
						}
					}),
				rightButton:
					new sap.m.Button({
						text: "Cancel",
						type: sap.m.ButtonType.Reject,
						tap : function() {
							dialog.close();
						}
					})
			});
		
		// open dialog
		sap.ui.getCore().getEventBus().publish("nav", "virtual");
		dialog.open();
	},
	
	handleForward : function (evt) {
		// lazy creation of recipient dialog
		if (!this._recipientDialog) {
			this._createRecipientDialog();
		}

		// open dialog
		sap.ui.getCore().getEventBus().publish("nav", "virtual");
		this._recipientDialog.open();
	},

	_createRecipientDialog : function (evt) {
		
		// create the dialog as an internal member
		this._recipientDialog = sap.ui.xmlfragment("view.RecipientHelpDialog", this);
		this._recipientDialog.setModel(sap.ui.getCore().getModel("i18n"), "i18n"); // TODO: remove once ResourceModel issue is fixed
		
		// TODO: sort does not work with GrowingList yet
			/*sorter : new sap.ui.model.Sorter("LastName", false, function (oContext) {
				var lastName = oContext.getProperty("LastName"),
					letter = (lastName && lastName.length > 0) ? lastName.charAt(0).toUpperCase() : "?";
				return {
					key: letter,
					text: letter
				};
			}),*/
	},
	
	closeRecipientDialog : function (evt) {

		// display the reject dialog if an item was selected 
		var selectedItem = evt.getParameter("selectedItem");
		if (selectedItem) {
			sap.ui.getCore().getEventBus().publish("nav", "virtual");
			this._showApproveRejectDialog("forward", selectedItem.getTitle());
		}
	},

	searchRecipientDialog : function (evt) {
		// Now filter the list based on the value in the search field 
		var filter = [];
		var sVal = evt.getParameter("value");
		if(sVal !== undefined) {
			//Get the binded items for the list
			var itemsBinding = evt.getParameter("itemsBinding");
		
			//create the local filter to apply
			var selectFilter = new sap.ui.model.Filter("LastName", sap.ui.model.FilterOperator.Contains , sVal);
			filter.push(selectFilter);
		
			// and apply the filter to the bound items, and the Select Dialog will update
			itemsBinding.filter(filter);
		}
	},
	
	handleLineItemViewChange : function (evt) {
		
		// create dialog
		if (!this._lineItemViewDialog) {
			var view = this.getView();
			this._lineItemViewDialog = new sap.m.ViewSettingsDialog({
				sortItems : [
					new sap.m.ViewSettingsItem({
						text : "OpNo",
						key : "opno",
						selected: true
					}),
					new sap.m.ViewSettingsItem({
						text : "Description",
						key : "shorttext"
					}),
					new sap.m.ViewSettingsItem({
						text : "Start Date",
						key : "startdate"
					}),
					new sap.m.ViewSettingsItem({
						text : "Duration",
						key : "duration"
					})
				],
				confirm : function (evt) {
					var params = evt.getParameters();
					var sortPath = params.sortItem.getKey();
					var sorter = new sap.ui.model.Sorter(sortPath, params.sortDescending);
					var binding = view.byId("lineItemList").getBinding("items");
					binding.sort(sorter);
				}
			});
		}
		
		// open dialog
		var button = this.getView().byId("lineItemViewButton");
		this._lineItemViewDialog.open();
	}
});
