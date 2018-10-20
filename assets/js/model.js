window.onload = initMap()

let map;
let markers = [];
let infowindow;
let idCardSelected;

//creando mapa que se muestra en  inicio,cuando aún no hay filtro para realizar busquedas

function initMap() {
	navigator.geolocation.getCurrentPosition(
		function (position) {
			let loc = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
			map = new google.maps.Map(document.getElementById('mapa'), {
				center: loc,
				zoom: 15
			});

			infowindow = new google.maps.InfoWindow();

			let request = {
				location: loc,
				radius: 5000,
				types: ['restaurant']
			};

			// Creamos el servicio PlaceService y enviamos la petición.
			let service = new google.maps.places.PlacesService(map);

			service.nearbySearch(request, function (results, status) {
				if (status === google.maps.places.PlacesServiceStatus.OK) {
					for (let i = 0; i < results.length; i++) {
						createMarker(results[i]);
					}
				}
			});


		},
		function (error) {

		}
	);
}

//crea marcadores y fotografias de los lugares seleccionados según filtro
function crearMarcadores(queries) {
	let service = new google.maps.places.PlacesService(map);
	service.textSearch({
		location: map.getCenter(),
		radius: 5000,
		query: [queries]
	}, function (results, status) {
		if (status === google.maps.places.PlacesServiceStatus.OK) {
			for (let i = 0; i < results.length; i++) {
				getPhotos(results[i])
				createMarker(results[i])
			}
		}
	});
}


//muestra marcadores en el mapa
function createMarker(place) {

	let marker = new google.maps.Marker({
		  map: map,
		  name:place.name,
		  position: place.geometry.location,
		  direccion:place.formatted_address
	});
	markers.push(marker);
}

//crea el modal de acuerdo a restaurant seleccionado
function createModal(idCardSelected){
	let request = {placeId:idCardSelected};
	
	let service = new google.maps.places.PlacesService(map)
    service.getDetails(request, callback);

	function callback(place) {
		
		let horario
		let schedule=place.opening_hours.open_now

		if (schedule===true){
			 horario='Horario: ABIERTO ahora'
		}else if(schedule===false){
			 horario='Horario:CERRADO ahora'
		}else if (schedule===undefined | null){
			horario='Horario:No disponible,lo Sentimos'
		}

	$("#address").text(place.formatted_address);
	$("#phoneNumber").text(place.international_phone_number);
	$("#rating").text(`Rating:${place.rating}`);
	$("#openNow").text(horario);		
	$(".modal-title").text(place.name);
	$("#myModal").modal('show');
	}

	let frame= `<iframe width="450" height="250"
  				frameborder="0" style="border:0"
  				src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDhxOEwT3spa_O9NM5y805O2IU7WxgFzoM&q=place_id:${idCardSelected}" allowfullscreen>
				</iframe>`

	$('#map_canvas').html(frame)		


}

