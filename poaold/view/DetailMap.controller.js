sap.ui.controller("view.DetailMap", {
	
	/**
	 * Initializes this controller
	 */


onInit : function () {
		 
		// subscribe for refresh events
		var bus = sap.ui.getCore().getEventBus();
		bus.subscribe("app", "RefreshDetail", this._refresh, this);
		
		//alert("Map Init");

		
	},
onAfterRendering: function () {  
			var mapPos;
			var mapLat;
			var mapLng;
	 var geocoder = new google.maps.Geocoder();
			var mobileDemo = "";
			var map = "";
			//alert("Map Render");
         if (!this.initialized) {  
             this.initialized = true;  
             this.geocoder = new google.maps.Geocoder();  
           var mapOptions = {  
                 center: new google.maps.LatLng(-34.397, 150.644),  
                 zoom: 8,  
                 mapTypeId: google.maps.MapTypeId.ROADMAP  
             };  
             this.map = new google.maps.Map(this.getView().byId("job_map_canvas").getDomRef(),  
                mapOptions);  
			//alert("hello");	
				this.buildMap();	
         }  
		
    },  
	/**
	 * Refreshes the view
	 */
_refresh : function (channelId, eventId, data) {
		//alert("Map REFRESH");
	},

buildMap: function () {  
//alert("Map bUILD");
		var model = sap.ui.getCore().getModel();
		var selectedDetail = this.getView().getBindingContext().getObject();
        var map = this.map;  
        var address = selectedDetail.postcode;  
		//alert("Map Build for "+address);
        this.geocoder.geocode({ 'address': address }, function (results, status) {  
            if (status == google.maps.GeocoderStatus.OK) {  
				//alert("maps ok"+results[0].geometry.location )
                map.setCenter(results[0].geometry.location);  
                var marker = new google.maps.Marker({  
                    map: map,  
                    position: results[0].geometry.location  
                });  
            } else {  
                alert('Geocode was not successful for the following reason: ' + status);  
            }  
        });  
		this.getView().byId("job_map_canvas").addStyleClass("myMap");
    }
});