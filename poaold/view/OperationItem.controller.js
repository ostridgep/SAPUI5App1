jQuery.sap.require("sap.m.MessageToast");

sap.ui.controller("view.OperationItem", {

	/**
	 * Called by the UI5 runtime to init this controller
	 */
	onInit : function () {
		
		// register for onBeforeShow events of pages in app
		this.getView().addEventDelegate({
			onBeforeShow : jQuery.proxy(function (evt) {
		
				this.onBeforeShow(evt);
			}, this)
		});
	},
	
	/**
	 * Called before the page (= this view) is shown in the app
	 */
	onBeforeShow : function (evt) {
	
		if (evt.data && evt.data.context) {
			this.getView().setBindingContext(evt.data.context);
		}
	},
	
	/**
	 * Refreshes the model
	 */
	_refresh : function (channelId, eventId, data) {
		
		if (data && data.context) {
			
			// set context of selected master object
			this.getView().setBindingContext(data.context);
			
			// scroll to top of page
			this.getView().byId("page").scrollTo(0);
		}
	},
	
	handleCreateTimeConfirmation : function (evt) {

		this._showCreateTimeConfirmationDialog();
	},
	handleUpdateStatus : function (evt) {

		this._showUpdateStatusDialog();
	},
	handleNavBack : function (evt) { 
		sap.ui.getCore().getEventBus().publish("nav", "back");
	},

		/**
	 * Shows the approve or reject dialog
	 * @param {String} [mode] Allows to differ between APPROVE and REJECT mode
	 */
	_showCreateTimeConfirmationDialog : function () {


		// create dialog
		var that = this;
		var dialog = new sap.m.Dialog({
			title : "Create Time Confirmation",
			content : [					//new sap.ui.core.HTML({content:"<h2 style='margin:0;padding: 0;'>Please enter the Time worked or Travelled?</h2>"}),
					new sap.ui.core.HTML({content:"<h3 style='margin:0;padding: 0;'>Duration</h3>"}),
					new sap.m.Slider("sDuration",{
						value: 0,
						min: 0,
						max: 120,
						step: 5,
						width: "50%",
						progress : true,
						change: _handleChange,
						livechange: _handleChange
					}),
					
					
					new sap.ui.core.HTML({content:"<h3 style='margin:0;padding: 0;'>Type:</h3>"}),
					new sap.m.Switch({	// switch custom text
						customTextOn: "Work",
						customTextOff: "Travel"
					}),
					new sap.ui.core.HTML({content:"<h3 style='margin:0;padding: 0;'>Start Date</h3>"}),
					new sap.m.Input({type: sap.m.InputType.Date, dateFormat: "dd.MM.YYYY", width: "150px"}),

					
					new sap.ui.core.HTML({content:"<h3 style='margin:0;padding: 0;'>Start Time</h3>"}),
					new sap.m.Input({type: sap.m.InputType.Time, timeFormat: "hh:mm", width: "150px"}),
					new sap.ui.core.HTML({content:"<h3 style='margin:0;padding: 0;'>Description</h3>"}),
					new sap.m.Input({type: sap.m.InputType.Text,  width: "400px"})
			],
			contentWidth : "30rem",
			stretchOnPhone : true,
			leftButton : new sap.m.Button({
				text : "Create",
				press : function () {
					dialog.close();
				}
			}),
			rightButton : new sap.m.Button({
				text : "Cancel",
				press : function () {
					dialog.close();
				}
			}),
			afterClose : function (evt) {
				
				//alert("After Close")
				dialog.destroy();
			}
		});
		//alert("dd")
		// open dialog
		sap.ui.getCore().getEventBus().publish("nav", "virtual");
		dialog.open();
	},
	_showUpdateStatusDialog : function () {


		// create dialog
		var that = this;
		var dialog = new sap.m.Dialog({
			title : "Update Status",
			content : [
			new sap.m.VBox("vbox1", {
				items:[
					new sap.m.RadioButton({groupName:"Gruppe1", text:"Accepted"}),
					new sap.m.RadioButton({groupName:"Gruppe1", text:"On Route"}),
					new sap.m.RadioButton({groupName:"Gruppe1", text:"On Site"}),
					new sap.m.RadioButton({groupName:"Gruppe1", text:"Complete"})
					]

			})
			],
			contentWidth : "30rem",
			stretchOnPhone : true,
			leftButton : new sap.m.Button({
				text : "Update",
				press : function () {
					dialog.close();
				}
			}),
			rightButton : new sap.m.Button({
				text : "Cancel",
				press : function () {
					dialog.close();
				}
			}),
			afterClose : function (evt) {
				
				//alert("After Close")
				dialog.destroy();
			}
		});

		sap.ui.getCore().getEventBus().publish("nav", "virtual");
		dialog.open();
	}
});

function _handleChange (oEvent) {
				var oSlider = oEvent.oSource;
				var fValue = oEvent.getParameter("value");
				
				var oTextView = oCore.getControl("TDuration");
				oTextView.setText( String(fValue) + " Mins");
				
	}