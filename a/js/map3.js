
var ResID = "";

$(function() {

		var marketId = []; //returned from the API
		var allLatlng = []; //returned from the API
		var allMarkers = []; //returned from the API
		var marketName = []; //returned from the API
		var infowindow = null;
		var pos;
		var userCords;
		var tempMarkerHolder = [];
		var distance;
		var user;
		//Start geolocation

		if (navigator.geolocation) {

			function error(err) {
				console.warn('ERROR(' + err.code + '): ' + err.message);
			}

			function success(pos){
				//userCords = pos.coords;
				userCords = new google.maps.LatLng(pos.coords.latitude,pos.coords.longitude);
				//alert(userCords);
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


	//Adding infowindow option
	infowindow = new google.maps.InfoWindow({
		content: "holding..."
	});

	$("#starwidget").css("display","none");
	//Fire up Google maps and place inside the map-canvas div
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        // Draw a circle around the user position to have an idea of the current localization accuracy


	//grab form data
    $('#chooseZip').submit(function() { // bind function to submit event of form

		//calculate Distance



    	var accessURL = "http://localhost/api/?interface=premise_restaurant";
		var accessURL2 = "http://localhost/api/?interface=premise_mosque";
		alert(userCords);
		// var a = $("#price-select").val();
		var z = document.getElementById("price-select").value;
		var b = document.getElementById("cuisine-select").value;
		var c = document.getElementById("criteria-select").value;
	 // alert(z);
		// alert (z + " " + b + " "+ c);

		var accessURL3= "http://localhost/api/?interface=filter&price="+z+"&criteria="+c+"&cuisine="+b;
		// alert(accessURL3);
    	// console.log(accessURL3);


		JSONP(accessURL3,function(data)
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

					//calculate Distance
					directionsService = new google.maps.DirectionsService();
					directionsDisplay = new google.maps.DirectionsRenderer(
					{
						suppressMarkers: true,
						suppressInfoWindows: true
					});
					directionsDisplay.setMap(map);
					var request = {
						origin:userCords,
						destination:myLatlng,
						travelMode: google.maps.DirectionsTravelMode.DRIVING
					};

				directionsService.route(request, function(response, status)
				{
					//alert(status);
				distance = "The distance between the two points on the chosen route is: "+response.routes[0].legs[0].distance.text;
				distance += "<br/>The aproximative driving time is: "+response.routes[0].legs[0].duration.text;
				//alert(distance)
				 // // document.getElementById("distance_road").innerHTML = distance;
				}




			 );

			//alert(val['images']);

					allMarkers = new google.maps.Marker({
						position: myLatlng,
						map: map,
						title: val['Premise_name'],
						html:
								'<div class="markerPop">' +
								'<p>' + val['Restaurant_name'] + '</p>' +
								'<p>' + val['Restaurant_Tel'] + '</p>' +
								// '<p>' + val['Restaurant_name']+ ' Details: <a href="restaurant_details.html">'+
								'<p>' + val['Restaurant_name']+ '<p>' + distance +' Details: <a onclick="storeInfoPhone(\'Rname\',\''+ val['Restaurant_name'] +'\');storeInfoPhone(\'Raddress\',\''+ val['Restaurant_address'] +'\');storeInfoPhone(\'Rurl\',\''+ val['Restaurant_URL'] +'\');storeInfoPhone(\'Rtel\',\''+ val['Restaurant_Tel'] +'\');storeInfoPhone(\'Rcriteria\',\''+ val['Restaurant_Criteria'] +'\');storeInfoPhone(\'Rcusine\',\''+ val['Restaurant_Cusine'] +'\');storeInfoPhone(\'Rprice\',\''+ val['Restaurant_price'] +'\');storeInfoPhone(\'Rcoords\',\''+ myLatlng +'\');storeInfoPhone(\'Rrating\',\''+ val['Restaurant_Rating'] +'\');storeInfoPhone(\'Rpic\',\''+ val['image'] +'\');storeInfoPhone(\'Rid\',\''+ val['Restaurant_id'] +'\');showrRestaurantInfo();" href="#">'+
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
						icon: 'images/masjid1.png',
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
	var kedai_coordinate = getInfoPhone("Rcoords");
	var kedaipic = getInfoPhone("Rpic");
	var kedaiid = getInfoPhone("Rid");
	ResID = kedaiid;
	//alert(kedaipic);


	// alert(kedai_address +" " + kedai_name +" " + kedai_url +" "+ kedai_url+" "+ kedai_tel+" "+ kedai_criteria+" "+ kedai_cusine+" "+ kedai_price+" "+ kedai_rating);
	// alert(kedai_name);
	$("#container2").css("display","block");
	// var output += "<tr><td>"+
                        // "<div class='event'>"+
                        // // "<span> #"+(i+1)+"</span>"+
                        // "<div class='info'>"+
                        // "For " +kedai_address+ " Pax <br>"+
                        // "<h4>" +kedai_criteria+ "</h4>"+
                        // ""+kedai_cusine+
                        // "</div>"+
                        // "<input class='detailButton' type='button' value='Show Details' onclick=\"window.location.href='index.html'\">"+                                         "<div class='price'> RM " +kedai_cusine+
                        // "</div></div>"+
                        // "</td></tr>";

	var star4 =
	"<div class='stars'>"+
    "<form action=''>"+
      "<input class='star star-5' id='star-5-2' type='radio' name='star' />"+
      "<label class='star star-5' for='star-5-2' onclick=mystar(5)></label>"+
      "<input class='star star-4' id='star-4-2' type='radio' name='star' />"+
      "<label class='star star-4' for='star-4-2' onclick=mystar(4)></label>"+
      "<input class='star star-3' id='star-3-2' type='radio' name='star' />"+
      "<label class='star star-3' for='star-3-2' onclick=mystar(3)></label>"+
      "<input class='star star-2' id='star-2-2' type='radio' name='star' />"+
      "<label class='star star-2' for='star-2-2' onclick=mystar(2)></label>"+
      "<input class='star star-1' id='star-1-2' type='radio' name='star' />+"+
      "<label class='star star-1' for='star-1-2' onclick=mystar(1)></label>"+
    "</form>"+
  "</div>"

var urlrating ="http://localhost/api/?interface=rating&id="+ResID;
var kedairating ="";

JSONP(urlrating,function(data){
	$.each(data,function(i,val){
		kedairating=val['Rating'];
		// alert(kedairating);
		var overall =
		"<div class='inner'>"+
			"<div class='rating'>"+
				"<span class='rating-num'>"+kedairating+"</span>"+
				"<div class='rating-stars'>";

				for(var i = 1 ; i <= kedairating; i++){

				overall +=	"<span><i class='active icon-star'></i></span>";}
					// "<span><i class='active icon-star'></i></span>"+
					// "<span><i class='active icon-star'></i></span>"+
					// "<span><i class='active icon-star'></i></span>"+
					// "<span><i class='active icon-star'></i></span>"+
					for(var i = 0 ; i < 5-kedairating; i++){
							overall += "<span><i class='icon-star'></i></span>";}
					// "<span><i class='icon-star'></i></span>"+
				overall +="</div>"+
				"<div class='rating-users'>"+
					"<i class='icon-user'></i>"+val['Number_user'] +" total"+
				"</div>"+
			"</div>"+
	"</div>";

// alert(kedairating);
// 	var overall =
// 	 "<div class='inner'>"+
//     "<div class='rating'>"+
//       "<span class='rating-num'>"+kedairating+"</span>"+
//       "<div class='rating-stars'>"+
//         "<span><i class='active icon-star'></i></span>"+
//         "<span><i class='active icon-star'></i></span>"+
//         "<span><i class='active icon-star'></i></span>"+
//         "<span><i class='active icon-star'></i></span>"+
//         "<span><i class='icon-star'></i></span>"+
//       "</div>"+
//       "<div class='rating-users'>"+
//         "<i class='icon-user'></i> 1,014,004 total"+
//       "</div>"+
//     "</div>"+
// "</div>"

	 $('.bar span').hide();
  $('#bar-five').animate({
     width: '75%'}, 1000);
  $('#bar-four').animate({
     width: '35%'}, 1000);
  $('#bar-three').animate({
     width: '20%'}, 1000);
  $('#bar-two').animate({
     width: '15%'}, 1000);
  $('#bar-one').animate({
     width: '30%'}, 1000);

  setTimeout(function() {
    $('.bar span').fadeIn('slow');
  }, 1000);

//	alert(kedaipic);

	$("#container2").html("<img src='"+kedaipic+"' alt='' width='100%' style='PADDING-LEFT: 50px; PADDING-RIGHT: 50px; PADDING-UP:15px; padding-bottom:20px';>" +"<a href='geo://"+myLatlng+"?q=dallas' data-rel='external'><button>Navigate</button><a>"
	+"<div class='decoration'><table style='100%'><tr><td><div class='rw-ui-container'></div></td></tr></table></div>" + "<div class='decoration' style='margin-left:auto;'><table style='width:100%'><tr><td>Premise Name :"+ kedai_name +"</td><td>Premise address :"+ kedai_address +"</td><td>Premise URL :"+ kedai_url +"</td></tr><tr><td>Premise Criteria :"+ kedai_criteria +"</td><td>Type Of cusine :"+ kedai_cusine +"</td><td>Premise Telephone :"+ kedai_tel +"</td></tr><tr><td>Tag :"+ kedai_tag +"</td><td>Price Range :"+ kedai_price +"</td><td>Rating Cleanliness"+ star4 +" </td></div>"+
	"<div class='decoration'></div>"+"<table align='center' style='width:100%'><tr><td>" + overall + "</td></tr>");
})
})
	$("#sidebar").css("display","none");
	$("#map-canvas").css("display","none");
	$("#search").css("display","none");
	$("#ayam").css("display","none");
	$("#mp").css("display","none");
	$("#sidebar").css("display","none");



	}

	function mystar(a){
		// alert(a);
		// alert(ResID);
		var response = confirm("Rating This Restaurant "+a +"?");

		var accessurl = "http://localhost/api/?interface=rating&id="+ResID;

if (response){
		var menujson = $.ajax(
        { type: "POST",
          url: accessurl,
          async: false
        }).responseText;

				menu = JSON.parse(menujson);

				for(var i = 0 ; menu.length; i++){

			//	alert(menu[i].Restaurant_id);
			//	 alert(menu[i].Number_user);
				//var oldrating = parseInt(menu[i].rating);
				var currentrating = parseFloat(a);
				var oldrating = parseFloat(menu[i].Rating);
				var olduser = parseInt(menu[i].Number_user);

				//alert(currentrating);
				//alert(oldrating);
			//	alert(menu[i].Rating);
			var x1 = oldrating*menu[i].Number_user;
			var x2 = currentrating * 1;
			var x3 = x1+x2;
			var r3 = x3/(olduser+1);
			r3 =r3.toPrecision(2);
			//alert(r3);

			var ratingid = menu[i].Rating_id;
			var Restaurantid = menu[i].Restaurant_id;
			var user = olduser +1;

			// alert(ratingid + " "+Restaurantid+ " "+user+ " "+r3);

			updaterating(r3,ratingid,Restaurantid,user);

			// var newrating = ((oldrating*menu[i].Number_user)+(currentrating*1))/(menu[i].Number_user+1);
				//var newrating = (oldrating + currentrating)/menu[i].Number_user;
			//	alert(newrating);
		}}

	}

	function updaterating(r3,ratingid,Restaurantid,user){
		// alert(ratingid + " "+Restaurantid+ " "+user+ " update "+r3);
	alert(r3);
var url = "http://localhost/api/?interface=rating2&id="+ratingid+"&Rid="+Restaurantid+"&rating="+r3+"&num="+user;
		JSONP(url,function(data){
			console.dir(data);
			if(data == "1")
			{
				alert("thank You For Rating");
				window.location.href= "chooserestaurant2.html";
			}
			else{
				alert("Oops! something Went Wrong.");
				window.location.href= "chooserestaurant2.html";
			}
		})
	}
