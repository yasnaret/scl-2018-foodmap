//categorias para realizar filtros en el  mapa
chatarra.addEventListener("click", function () {
	borrarMarcadores();
	$('#imgContainer').empty();
	crearMarcadores("fast food");

});
sushi.addEventListener("click", function () {
	borrarMarcadores();
	$('#imgContainer').empty();
	crearMarcadores("sushi");

});
bares.addEventListener("click", function () {
	borrarMarcadores();
	$('#imgContainer').empty();
	crearMarcadores("bares");

});
peruana.addEventListener("click", function () {
	borrarMarcadores();
	$('#imgContainer').empty();
	crearMarcadores("peruana");

});
arabe.addEventListener("click", function () {
	borrarMarcadores();
	$('#imgContainer').empty();
	crearMarcadores("arabe");

});
let searchingFood
busqueda.addEventListener("click", function (event) {
	event.preventDefault()
	searchingFood=$('#buscador').val()
	borrarMarcadores();
	$('#imgContainer').empty();
	crearMarcadores(searchingFood);

});

//borrar los marcadores generados en el mapa entre busquedas
function borrarMarcadores() {
	for (let i = 0; i < markers.length; i++) {
		markers[i].setMap(null);
	}
	markers = [];
}