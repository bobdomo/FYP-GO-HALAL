/* Pull local Farers market data from the USDA API and display on 
** Google Maps using GeoLocation or user input zip code. By Paul Dessert
** www.pauldessert.com | www.seedtip.com
*/



$(function() {
	
		var marketId = []; //returned from the API
		var allLatlng = []; //returned from the API
		var allMarkers = []; //returned from the API
		var marketName = []; //returned from the API
		var infowindow = null;
		var pos;
		var userCords;
		var tempMarkerHolder = [];
		
		//Start geolocation
		
		if (navigator.geolocation) {    
		
			function error(err) {
				console.warn('ERROR(' + err.code + '): ' + err.message);
			}
			
			function success(pos){
				userCords = pos.coords;
				
				//return userCords;
			}
		
			// Get the user's current position
			
			navigator.geolocation.getCurrentPosition(success, error);
			} else {
				alert('Geolocation is not supported in your browser');
			}
		
		//End Geo location
	
		//map options
		var mapOptions = {
			zoom: 10,
			center: new google.maps.LatLng(35.724117, 139.730394),
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			//center: new google.maps.LatLng(37.09024, -100.712891),
			panControl: false,
			panControlOptions: {
				position: google.maps.ControlPosition.BOTTOM_LEFT
			},
			zoomControl: true,
			zoomControlOptions: {
				style: google.maps.ZoomControlStyle.LARGE,
				position: google.maps.ControlPosition.RIGHT_CENTER
			},
			scaleControl: false

		};
		
		// var map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
		
	//Adding infowindow option
	infowindow = new google.maps.InfoWindow({
		content: "holding..."
	});
	
	//Fire up Google maps and place inside the map-canvas div
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

	
	
	//grab form data
    $('#chooseZip').submit(function() { // bind function to submit event of form
		
    	var accessURL = "http://localhost/api/?interface=premise_restaurant";
		var accessURL2 = "http://localhost/api/?interface=premise_mosque";


    	JSONP(accessURL,function(data)
    		{
    			//console.log(data);

    			$.each(data,function(i,val){
    				//console.log(i);
    				//console.log(val);



    				var latLong = val['Restaurant_coordinates'].replace(" ","").split(",");

					//var split = latLong.split(',');
					var latitude = latLong[0];
					var longitude = latLong[1];
					
					//set the markers.	  
					myLatlng = new google.maps.LatLng(latitude,longitude);
			  
					allMarkers = new google.maps.Marker({
						position: myLatlng,
						map: map,
						title: val['Premise_name'],
						html: 
								'<div class="markerPop">' +
								'<p>' + val['Restaurant_name'] + '</p>' +
								'<p>' + val['Restaurant_Tel'] + '</p>' +
								'<p>' + val['Restaurant_name']+ ' Details: <a href="restaurant_details.html">'+
      'See More</a> ' + '<p>'+
								'</div>'
					});

google.maps.event.addListener(allMarkers, 'click', function () {
									infowindow.setContent(this.html);
									infowindow.open(map, this);
								});



    			}) // each
    		})

			JSONP(accessURL2,function(data)
    		{
    			//console.log(data);

    			$.each(data,function(i,val){
    				//console.log(i);
    				//console.log(val);
					var name = "Majidbandarkinrara47180selangordarulehsan" ;
					// var name = val['Mosque_name'].replace(" ","");
					// alert(val['Mosque_coordinate']);

    				var latLong = val['Mosque_coordinate'].replace(" ","").split(",");
						
					//var split = latLong.split(',');
					var latitude = latLong[0];
					var longitude = latLong[1];
					
					//set the markers.	  
					myLatlng = new google.maps.LatLng(latitude,longitude);
			  
					allMarkers = new google.maps.Marker({
						position: myLatlng,
						map: map,
						title: val['Mosque_name'],
						html: 
								'<div class="markerPop1">' +
								'<p>' + val['Mosque_name'] + '</p>' +
								'<p>' + val['Mosque_URL'] + '</p>' +
								'<p>' + val['Mosque_name']+ ' Details: <a href="javascript:changecontent(' + latitude +');">'+
      'See More</a> ' + '<p>'+
								'</div>'
					});

google.maps.event.addListener(allMarkers, 'click', function () {
									infowindow.setContent(this.html);
									infowindow.open(map, this);
								});



    			}) // each
    		})
			

		/*
		//define and set variables
		var userZip = $("#textZip").val();
		//console.log("This-> " + userCords.latitude);
		
		var accessURL;
		
		if(userZip){
			accessURL = "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=" + userZip;
		} else {
			accessURL = "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/locSearch?lat=" + userCords.latitude + "&lng=" + userCords.longitude;
		}
			

			//Use the zip code and return all market ids in area.
			$.ajax({
				type: "GET",
				contentType: "application/json; charset=utf-8",
				url: accessURL,
				dataType: 'jsonp',
				success: function (data) {

					 $.each(data.results, function (i, val) {
						marketId.push(val.id);
						marketName.push(val.marketname);
					 });
						
					//console.log(marketName);
					
					var counter = 0;
					//Now, use the id to get detailed info
					$.each(marketId, function (k, v){
						$.ajax({
							type: "GET",
							contentType: "application/json; charset=utf-8",
							// submit a get request to the restful service mktDetail.
							url: "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=" + v,
							dataType: 'jsonp',
							success: function (data) {

							for (var key in data) {

								var results = data[key];
								
								//console.log(results);
								
								//The API returns a link to Google maps containing lat and long. This pulls it apart.
								var googleLink = results['GoogleLink'];
								var latLong = decodeURIComponent(googleLink.substring(googleLink.indexOf("=")+1, googleLink.lastIndexOf("(")));
								
								var split = latLong.split(',');
								var latitude = split[0];
								var longitude = split[1];
								
								//set the markers.	  
								myLatlng = new google.maps.LatLng(latitude,longitude);
						  
								allMarkers = new google.maps.Marker({
									position: myLatlng,
									map: map,
									title: marketName[counter],
									html: 
											'<div class="markerPop">' +
											'<h1>' + marketName[counter].substring(4) + '</h1>' + //substring removes distance from title
											'<h3>' + results['Address'] + '</h3>' +
											'<p>' + results['Products'].split(';') + '</p>' +
											'<p>' + results['Schedule'] + '</p>' +
											'</div>'
								});

								//put all lat long in array
								allLatlng.push(myLatlng);
								
								//Put the marketrs in an array
								tempMarkerHolder.push(allMarkers);
								
								counter++;
								//console.log(counter);
							};
								
								google.maps.event.addListener(allMarkers, 'click', function () {
									infowindow.setContent(this.html);
									infowindow.open(map, this);
								});
								
								
								//console.log(allLatlng);
								//  Make an array of the LatLng's of the markers you want to show
								//  Create a new viewpoint bound
								var bounds = new google.maps.LatLngBounds ();
								//  Go through each...
								for (var i = 0, LtLgLen = allLatlng.length; i < LtLgLen; i++) {
								  //  And increase the bounds to take this point
								  bounds.extend (allLatlng[i]);
								}
								//  Fit these bounds to the map
								map.fitBounds (bounds);
								
										
							}
						});
					}); //end .each
				}
			});
		*/
        return false; // important: prevent the form from submitting
    });
	
});


	function changecontent(name) {
		// alert("ayam");
		var output = name;	
		// output = data.val['Mosque_coordinate'];
		document.getElementById("container2").innerHTML = output;
	
		// document.getElementById("container2").innerHTML = "New text!";
		document.getElementById("map-canvas").style.display = 'none';
		document.getElementById("ayam").style.display = 'none';
		document.getElementById("search").style.display = 'none';
	
		
	}
