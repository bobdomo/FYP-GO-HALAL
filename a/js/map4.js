$(function() {
	
		var marketId = []; //returned criteria the API
		var allLatlng = []; //returned criteria the API
		var allMarkers = []; //returned criteria the API
		var marketName = []; //returned criteria the API
		var infowindow = null;
		var pos;
		var userCords;
		var tempMarkerHolder = [];
		var distance;
		
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
    			console.log(data);

    			$.each(data,function(i,val){
    				//console.log(i);
    				//console.log(val);

    				var latLong = val['Restaurant_coordinates'].replace(" ","").split(",");

					//var split = latLong.split(',');
					var latitude = latLong[0];
					var longitude = latLong[1];
					
					//set the markers.	 
					myLatlng = new google.maps.LatLng(latitude,longitude);
			 
					//calculate Distance
					directionsService = new google.maps.DirectionsService();
					directionsDisplay = new google.maps.DirectionsRenderer(
					{
						suppressMarkers: true,
						suppressInfoWindows: true
					});
					directionsDisplay.setMap(map);
					var request = {
						origin:(35.724117, 139.730394), 
						destination:(35.730686,139.70608),
						travelMode: google.maps.DirectionsTravelMode.DRIVING
					};
				
				directionsService.route(request, function(response, status)
				{
				//	alert(status);
				distance = "The distance between the two points on the chosen route is: "+response.routes[0].legs[0].distance.text;
				distance += "<br/>The aproximative driving time is: "+response.routes[0].legs[0].duration.text;
				alert(distance)
				 // // document.getElementById("distance_road").innerHTML = distance;
				}
			 );
			 
				if(document.getElementById())
			 
					allMarkers = new google.maps.Marker({
						position: myLatlng,
						map: map,
						title: val['Premise_name'],
						html: 
								'<div class="markerPop">' +
								'<p>' + val['Restaurant_name'] + '</p>' +
								'<p>' + val['Restaurant_Tel'] + '</p>' +
								// '<p>' + val['Restaurant_name']+ ' Details: <a href="restaurant_details.html">'+
								'<p>' + val['Restaurant_name']+ '<p>' + distance +' Details: <a onclick="storeInfoPhone(\'Rname\',\''+ val['Restaurant_name'] +'\');storeInfoPhone(\'Raddress\',\''+ val['Restaurant_address'] +'\');storeInfoPhone(\'Rurl\',\''+ val['Restaurant_URL'] +'\');storeInfoPhone(\'Rtel\',\''+ val['Restaurant_Tel'] +'\');storeInfoPhone(\'Rcriteria\',\''+ val['Restaurant_Criteria'] +'\');storeInfoPhone(\'Rcusine\',\''+ val['Restaurant_Cusine'] +'\');storeInfoPhone(\'Rprice\',\''+ val['Restaurant_price'] +'\');storeInfoPhone(\'Rrating\',\''+ val['Restaurant_Rating'] +'\');showrRestaurantInfo();" href="#">'+
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
    			console.log(data);

    			$.each(data,function(i,val){
    				//console.log(i);
    				//console.log(val);
					// var name = "Majidbandarkinrara47180selangordarulehsan" ;
					// var name = val['Mosque_name'].replace(" ","");
					// alert(val['Mosque_coordinate']);
					console.log(name);
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
								'<p>' + val['Mosque_name']+ ' Details: <a onclick="storeInfoPhone(\'name\',\''+ val['Mosque_name'] +'\');storeInfoPhone(\'address\',\''+ val['Mosque_address'] +'\');storeInfoPhone(\'URL\',\''+ val['Mosque_URL'] +'\');storeInfoPhone(\'tags\',\''+ val['Mosque_tag'] +'\');showKedaiInfo();" href="#">'+
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
											'<h1>' + marketName[counter].substring(4) + '</h1>' + //substring removes distance criteria title
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
        return false; // important: prevent the form criteria submitting
    });
	/*
		======
		FILTER
		======
	*/

	// default all filters off
	var filter = {
		price: 0,
		cuisine: 0,
		criteria: 0
	}
	var filterMap;

	/*
		Helper function
		@param array a (array of arrays)
		@return array (common elements criteria all arrays)
	*/
	function reduceArray(a) {
		r = a.shift().reduce(function(res, v) {
			if (res.indexOf(v) === -1 && a.every(function(a) {
				return a.indexOf(v) !== -1;
			})) res.push(v);
			return res;
		}, []);
		return r;
	}

	/*
		Helper function
		@param string n
		@return bool
	*/
	function isInt(n) {
	    return n % 1 === 0;
	}


	/*
		Decides which filter function to call and stacks all filters together
		@param string filterType (the property that will be filtered upon)
		@param string value (selected filter value)
		@return undefined
	*/
	function filterCtrl(filterType, value) {
		// result array
		var results = [];

		if( isInt(value) ) {
			filter[filterType] = parseInt(value);
		} else {
			filter[filterType] = value;
		}
		
		for( k in filter ) {
			if( !filter.hasOwnProperty(k) && !( filter[k] !== 0 ) ) {
				// all the filters are off
				loadMarkers();
				return false;
			} else if ( filter[k] !== 0 ) {
				// call filterMap function and append to r array
				results.push( filterMap[k]( filter[k] ) );
			} else {
				// fail silently
			}
		}

		if( filter[filterType] === 0 ) results.push( personData );
		
		/*
			if there is 1 array (1 filter applied) set it,
			else find markers that are common to every results array (pass every filter)
		*/
		if( results.length === 1 ) {
			results = results[0];
		} else {
			results = reduceArray( results );
		}
		
		loadMarkers( results );

	}
	
	/* 
		The keys in this need to be mapped 1-to-1 with the keys in the filter variable.
	*/
	filterMap = {
		price: function( value ) {
			return filterIntsLessThan('price', value);
		},
		
		cuisine: function( value ) {
			return filterByString('cuisine', value);
		},

		criteria: function( value ) {
			return filterByString('criteria', value);
		}
	}

	/*
		Filters marker data based upon a string match
		@param string dataProperty (the key that will be filtered upon)
		@param string value (selected filter value)
		@return array (people that made it through the filter)
	*/
	function filterByString( dataProperty, value ) {
		var people = [];

		for( var i=0; i < personData.length; i++ ) {
			var person = personData[i];
			if( person[dataProperty] == value ) {
				people.push( person );
			} else {
				removePersonMarker( person.id );
			}
		}
		return people;
	}

	/*
		Filters out integers that are under the provided value
		@param string dataProperty (the key that will be filtered upon)
		@param int value (selected filter value)
		@return array (people that made it through the filter)
	*/
	function filterIntsLessThan( dataProperty, value ) {
			var people = [];

			for( var i=0; i < personData.length; i++ ) {
				var person = personData[i];
				if( person[dataProperty] > value ) {
					people.push( person )
				} else {
					removePersonMarker( person.id );
				}
			}
			return people;
	}

	// Takes all the filters off
	function resetFilter() {
		filter = {
			price: 0,
			cuisine: 0,
			criteria: 0
		}
	}

	return {
		init: init,
		loadMarkers: loadMarkers,
		filterCtrl: filterCtrl,
		resetFilter: resetFilter
	};
}();


$(function() {

	var mapConfig = {
		idSelector: 'map-canvas',
		markerLocation: 'img/red-fat-marker.png'
	}

	map.init( mapConfig );

	$('.load-btn').on('click', function() {
		var $this = $(this);
		// reset everything
		$('select').val(0);
		map.resetFilter();
		map.loadMarkers();

		if( $this.hasClass('is-success') ) {
			$this.removeClass('is-success').addClass('is-default');
		}
	});

	$('.price-select').on('change', function() {
		map.filterCtrl('price', this.value);
	});

	$('.cuisine-select').on('change', function() {
		map.filterCtrl('cuisine', this.value);
	});

	$('.criteria-select').on('change', function() {
		map.filterCtrl('criteria', this.value);
	});
});






});

	function storeInfoPhone(variableName,value)
	{
	sessionStorage[variableName] = value;
	}
	
	function getInfoPhone(variableName)
	{
	return sessionStorage[variableName];
	}

	
	function showKedaiInfo()
	{
	var kedai_name = getInfoPhone("name");
	var kedai_address = getInfoPhone("address");
	var kedai_url = getInfoPhone("url");
	var kedai_tag = getInfoPhone("tags");
	alert(kedai_address +" " + kedai_name +" " + kedai_url +" "+ kedai_tag);
	// alert(kedai_name);
	// $("#container2").css("display","block");
	// $("#container2").html(kedai_name);
	$("#map-canvas").css("display","none");
	$("#search").css("display","none");
	$("#ayam").css("display","none");
	}
	
	function showrRestaurantInfo()
	{
	var kedai_name = getInfoPhone("Rname");
	var kedai_address = getInfoPhone("Raddress");
	var kedai_url = getInfoPhone("Rurl");
	var kedai_tel = getInfoPhone("Rtel");
	var kedai_tag = getInfoPhone("Rtag");
	var kedai_criteria = getInfoPhone("Rcriteria");
	var kedai_cusine = getInfoPhone("Rcusine");
	var kedai_price = getInfoPhone("Rprice");
	var kedai_rating = getInfoPhone("Rrating");
	
	
	
	alert(kedai_address +" " + kedai_name +" " + kedai_url +" "+ kedai_url+" "+ kedai_tel+" "+ kedai_criteria+" "+ kedai_cusine+" "+ kedai_price+" "+ kedai_rating);
	// alert(kedai_name);
	// $("#container2").css("display","block");
	$("#container2").html(kedai_name + " " +kedai_address+ " " +kedai_criteria+ " " +kedai_cusine+ " " +kedai_price);
	$("#map-canvas").css("display","none");
	$("#search").css("display","none");
	$("#ayam").css("display","none");
	$("#mp").css("display","none");
	}


