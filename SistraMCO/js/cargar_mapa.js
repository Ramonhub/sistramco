
var map;
var idlotesgeneral;

function buscar_cordenadas_lotes(idlotes,long_c,lat_c) {
	alert(idlotes+"="+long_c+"="+lat_c);
	document.getElementById("map").innerHTML = "";
	ver_vetana_informativa("Cargando datos en Mapa",id_progreso);
	var datos = new FormData();
	datos.append("func", 'buscar_cordenadas')
	datos.append("idbarrios", idlotes)

	
                  
 mapboxgl.accessToken = 'pk.eyJ1Ijoicm9sYW5kLTk1IiwiYSI6ImNrY2t5aDhjdTEzdDAyem8yMzRveHh2OXkifQ.PZvs-6oK36FGKUSBWxbyMw';
 map = new mapboxgl.Map({
container: 'map',
// style: 'mapbox://styles/mapbox/satellite-streets-v11',
 style: 'mapbox://styles/mapbox/satellite-streets-v11', 
  //style: 'mapbox://styles/mapbox/streets-v11',

 center: [long_c, lat_c],
 zoom: 12,
 pitch: 45,
 bearing: -17.6,
 container: 'map'
 
});
//este es para poner marcador desde aca
	var geojson = {
'type': 'FeatureCollection',
'features': [
{
'type': 'Feature',
'properties': {
'message': 'Foo',
'iconSize': [60, 60]
},
'geometry': {
'type': 'Point',
'coordinates': [long_c, lat_c]
}
}
]
};
	
}	
	
	
	/*desde aca*/
geojson.features.forEach(function(marker) {
// create a DOM element for the marker
var parrafo = document.createElement("p");
var parrafo1 = document.createElement("span");
parrafo.className = 'texto_marker';	
parrafo1.className = 'texto_marker1';	
// Crear nodo de tipo Text
var contenido = document.createTextNode(idloteamiento);
parrafo.appendChild(contenido);

var contenido1 = document.createTextNode(loteamiento);
parrafo1.appendChild(contenido1);

var el = document.createElement('div');
el.className = 'marker';
el.style.backgroundImage =
'url("./icono/pin.png")';
el.appendChild(parrafo1);
el.appendChild(parrafo);

el.style.width = marker.properties.iconSize[0] + 'px';
el.style.height = marker.properties.iconSize[1] + 'px'; 
el.addEventListener('click', function() {
	/* abrir_cerrar_ventanas_Loteamientos_Mapa(d,centrar,idlotes,longi,lati) */
	abrir_cerrar_ventanas_Loteamientos_Mapa("1","",idloteamiento,long_c,lat_c);
/* window.alert(marker.properties.message); */
});
	/*hsra aca*/
	
new mapboxgl.Marker(el)
.setLngLat(marker.geometry.coordinates)
.addTo(map);
	
	});
	
map.addControl(new mapboxgl.NavigationControl());
map.on('load', function() {
var iddatos="";
for (var i = 0; i < lotes.length; i++) {
map.addSource('maine'+idoa[i][0].toString(), {
'type': 'geojson',
'data': {
'type': 'FeatureCollection',
'features': [{
'type': 'Feature',
'properties':{ 
'description':idoa[i][0]
},
'geometry':{
'type': 'Polygon',
'coordinates': [lotes[i]]
}
}]
}});

map.addLayer({
'id': 'maine'+idoa[i][0].toString(),
'type': 'fill',
'source': 'maine'+idoa[i][0].toString(),
'layout': {},
'paint': {
'fill-color': colot[i].toString(),
'fill-outline-color': '#007105',
'fill-opacity': 0.8
}
});

map.addLayer({
'id': 'maineL'+idoa[i][0].toString(),
'type': 'line',
'source': 'maine'+idoa[i][0].toString(),
'layout': {},
'paint': {
'line-color': '#01f10b',
'line-width': 3
}
});

map.addLayer({
        'id': 'label'+idoa[i][0].toString(),
        'type': 'symbol',
        'source': 'maine'+idoa[i][0].toString(),
        'layout': {
        	'text-field':''+numlott[i][0].toString()+'  ('+(manz[i][0].toString()).replace("MANZANA ","M")+')',			
			"text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            "text-size": 12
        },
        'paint': {
               
			   "text-color": "#000",
                "text-halo-color": "#fff",
                "text-halo-width": 2.5
            
        }
    });

map.on('click', 'maine'+idoa[i][0].toString(), function(e) {
var toltip=new mapboxgl.Popup()
toltip.setLngLat(e.lngLat)
.setHTML("<div style='width: 220px;' id='cnt_detallesmap_"+e.features[0].properties.description+"'></div>")
.addTo(map);
buscar_detalles_lotes(e.features[0].properties.description);
idlotesgeneral=e.features[0].properties.description;
});

	}
map.zoomTo(17, { duration: 1000 });
cerrar_esta_ventanas("");
});

		// 		}
		// 		else {

		// 			alert("LO SENTIMOS HA OCURRIDO UN ERROR")
		// 		}
        //      try {
		// 	} catch (error) {
		// 		alert("Error Fatal: " + error)

		// 	}
		// }
	// });



function buscar_lote(idbarrios,longitud_c,latitud_c) {
	var datos = new FormData();
	datos.append("func", 'buscar_lotes')
	var OpAjax = $.ajax({
		data: datos,
		url: "./php/buscarCordenadas_lotes.php",
		type: "post",
		cache: false,
		contentType: false,
		processData: false,
		error: function (jqXHR, textstatus, errorThrowm) {
			alert("ERROR DE CONEXIÓN")
			return false;
		},
		success: function (responseText) {

			Respuesta = responseText;
			console.log(Respuesta)
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				if (Respuesta == "exito") {
					var lotes=datos[2];
					for (var i = 0; i < lotes.length; i++) {
						var idlotes=lotes[i];
					}
                  buscar_cordenadas_lotes(idbarrios,longitud_c,latitud_c);
				}
				else {

					alert("LO SENTIMOS HA OCURRIDO UN ERROR")
				}

			} catch (error) {
				alert("Error Fatal: " + error)

			}
		}
	});

}

//busccar datos
function buscar_detalles_lotes(idlotes) {
	
	var datos = {
		"idlotes": idlotes,
		"func": "buscar_detalles_lotes"
	};
	$.ajax({
		data: datos, url: "./php/buscarCordenadas_lotes.php", type: "post", beforeSend: function () {

		}, error: function (jqXHR, textstatus, errorThrowm) {

			
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			

			if (Respuesta != "error") {
				try {
					var datos = $.parseJSON(Respuesta);
					Respuesta = datos["2"];
					var datos_buscados = Respuesta;
                  $("div[id=cnt_detallesmap_"+idlotes+"]").each(function(i,elementohtml){
						elementohtml.innerHTML = datos_buscados;
						
					}); 
					/* document.getElementById("cnt_detallesmap_"+idlotes+"").innerHTML = datos_buscados */
				} catch (error) {

				}

			}
		}
	});


}

