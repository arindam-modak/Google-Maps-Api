
function initGeolocation()
    {
            if( navigator.geolocation )
            {

              navigator.geolocation.getCurrentPosition( success, fail );
        }
        else
        {
              alert("Sorry, your browser does not support geolocation services.");
        }
    }

     var map;
	 
     function success(position)
     {
		 var n1=$("#loc").val();
//var n1 = 'hospital';
           var coords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

           var mapOptions =
          {
                      zoom: 14,
                      center: coords,
                      mapTypeControl: false,
                      navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
                      mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
			
			
			placesRequest('Schools',coords,1500,[n1],'school.gif');
			//placesRequest('Hospitals',coords,1500,['hospital'],'hospital.gif');


            var marker = new google.maps.Marker({
                      position: coords,
                      map: map,
                      title: "Your current location!"
            });
			
        }

        function fail()
        {
            
        }
		
		function placesRequest(title,latlng,radius,types,icon)
		{
		
			var request = {
				location: latlng,
				radius: radius,
				types: types
			};
			var callPlaces = new google.maps.places.PlacesService(map);
			callPlaces.search(request, function(results,status){
				$.each(results, function(i,place){
					var placeLoc = place.geometry.location;
					 var thisplace = new google.maps.Marker({
						 map: map,
						 position: place.geometry.location,
						 icon: icon,
						 title: place.name
					 });
				})
			});
			
		}
		
	