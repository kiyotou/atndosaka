function initialize() {

	// set Google Map 
	var latlng = new google.maps.LatLng(34.6718, 135.497841);
	var myOptions = {
	  zoom: 15,
	  center: latlng,
	  mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("map"), myOptions);

}






