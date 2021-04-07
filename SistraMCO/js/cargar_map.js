
var map;
var idlotesgeneral;

function buscar_cordenadas_lotes(idlotes,long_c,lat_c) {
	//alert(idlotes+"="+long_c+"="+lat_c);
	document.getElementById("map").innerHTML = "";
    document.getElementById("mapa").style.display = '';
	ver_vetana_informativa("Cargando datos en Mapa",id_progreso);
	var datos = new FormData();
	datos.append("func", 'buscar_cordenadas')
	datos.append("idbarrios", idlotes)

	mapboxgl.accessToken = 'pk.eyJ1IjoicmFtb25ybGIiLCJhIjoiY2tscjkzeXcwMWFyZTJ2bzQyMDI2M3Q3YiJ9.ARC_PhyzhcbP_c-qauVlvw';
		var coordinates = document.getElementById('coordinates');
		var map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/streets-v11',
		center: [-56.45, -25.46],
		zoom: 13
		});
		 
		var marker = new mapboxgl.Marker({
		draggable: true
		})
		.setLngLat([-56.45, -25.46])
		.addTo(map);
		
		function onDragEnd() {
		var lngLat = marker.getLngLat();
		function ocultar_coord() {
        coordinates.style.display = 'none';
        }
        
        setTimeout(ocultar_coord, 3000);
        coordinates.style.display = 'block';
		coordinates.innerHTML =
		'Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat;
		let coordenadas = lngLat;
		console.log(coordenadas);
		return coordenadas;
		}
		
		marker.on('dragend', onDragEnd);
}

