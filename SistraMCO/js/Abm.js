/*AÑADIR O MODIFICAR NUEVO MUNICIPIOS*/
function add_datos_municipalidades(datos){
	var f= new Date
	var id_progreso=f.getMinutes()+"_"+f.getMilliseconds()+"_mensaje";
	var idmunicipalidades=document.getElementById('inp_idmunicipalidades').value;
	var municipalidad=document.getElementById('inp_municipio').value;
	var telefono=document.getElementById('inp_telefonomunicipio').value;
	var direccion=document.getElementById('inp_direccionmunicipio').value;
	var idciudades=document.getElementById('combo_idmunicipalidades_Ciudades').value;
    var accion='guardar';
	
	if($(datos).children('p[id="accion_guardar_municipalidades"]').html()=='guardar'){
		accion='guardar';
	}
	if($(datos).children('p[id="accion_guardar_municipalidades"]').html()=='editar'){
		accion='editar';
	}
	if(datos=='eliminar'){
		accion='eliminar';
	}

	 
			ver_vetana_informativa("Cargando....",id_progreso);
		
		
			  var datos = new FormData();
			 datos.append("func", accion)
			 datos.append("idmunicipalidades" , idmunicipalidades)
			 datos.append("municipalidad" , municipalidad)
			 datos.append("telefono" , telefono)
			 datos.append("direccion" , direccion)
			 datos.append("idciudades" , idciudades)
			
	
			var OpAjax= $.ajax({
			
			data: datos,
			url: "./php/abmMunicipalidades.php",
			type:"post",
	        cache:false,
			contentType: false,
			processData: false,
				error: function(jqXHR, textstatus, errorThrowm){
					cerrar_esta_ventanas(id_progreso);
					
					ver_vetana_informativa("ERROR DE CONEXIÓN...!",id_progreso) 
					

					 return false;
			},
			success: function(responseText)
			{ 	 

			Respuesta=responseText;			
			console.log(Respuesta);
			
	  if (Respuesta=="camposvacio"){
		ver_vetana_informativa("FALTÓ COMPLETAR ALGUN CAMPO",id_progreso);	
						return false;
		}
		if (Respuesta=="duplicado"){
				ver_vetana_informativa("DATO DUPLICADO",id_progreso);
						return false;
		}
	if(Respuesta=="in"){
		ver_vetana_informativa("DATO INCORRECTO",id_progreso);
		return false();
	} 
	  
			if (Respuesta=="exito") {	
			
			if(accion=='guardar'){
				ver_vetana_informativa("DATOS REGISTRADO CORRECTAMENTE",id_progreso)
				 limpiar_campos_municipalidades();
				 buscar_datos_municipalidades("ACTIVO");
			}
			if(accion=='editar'){
				ver_vetana_informativa("DATOS ACTUALIZADO CORRECTAMENTE",id_progreso)
				 limpiar_campos_municipalidades();
				 buscar_datos_municipalidades("ACTIVO");
			}
			if(accion=='eliminar'){
				ver_vetana_informativa("DATOS ELIMINADO CORRECTAMENTE",id_progreso)
				 limpiar_campos_municipalidades();
				 buscar_datos_municipalidades("ACTIVO");
			}
			
			} else {
		
				 ver_vetana_informativa("LO SENTIMOS OCURRIO ALGO INESPERADO!",id_progreso)
				 limpiar_campos_municipalidades();
			}		
			}
			});		
}

function limpiar_campos_municipalidades(){
	 
	 
	document.getElementById('inp_idmunicipalidades').value='';
	document.getElementById('inp_municipio').value;
	document.getElementById('inp_telefonomunicipio').value='';
    document.getElementById('inp_direccionmunicipio').value='';
	
   document.getElementById('btn_guardar_municipalidades').innerHTML = "<p style='display:none;' id='accion_guardar_municipalidades'>guardar</p>GUARDAR";
}

var estado_municipalidades='ACTIVO';
function buscar_por_opciones_municipalidades(d){
	if(d=="1"){
	estado_municipalidades='ACTIVO';
    buscar_datos_municipalidades(estado_municipalidades);
	abrir_cerrar_ventanas_municipalidades("6");
	}
	if(d=="2"){
	estado_municipalidades='ELIMINADO';
	 buscar_datos_municipalidades(estado_municipalidades);
    abrir_cerrar_ventanas_municipalidades("6");	
	}
	
}
//busccar datos regiones
function buscar_datos_municipalidades(buscar2){
 	
var buscador=document.getElementById('inpt_buscador_municipalidades').value
		 document.getElementById("cnt_listado_municipalidades1").innerHTML=""
			var datos = {
			"buscar": buscador,
			"buscar2": buscar2,
			"func": "buscar"
			};
	 $.ajax({
			data: datos,url: "./php/abmMunicipalidades.php",type:"post",beforeSend: function(){
				
			},error: function(jqXHR, textstatus, errorThrowm){
	
			document.getElementById("cnt_listado_municipalidades1").innerHTML=''
			},
			success: function(responseText)
			{
	
			var Respuesta=responseText;
     console.log(Respuesta)
			  document.getElementById("cnt_listado_municipalidades1").innerHTML=''
			
			
			if (Respuesta != "error")
			{		
				try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
		  var datos_buscados=Respuesta;
		 
			document.getElementById("cnt_listado_municipalidades1").innerHTML=datos_buscados
			document.getElementById("lbltotalmunicipalidades").innerHTML="CANTIDAD: "+datos["2"];
} catch(error)
				{
					
				}
	  
			}
			}
			});
}

function obtener_datos_municipalidades(datospr){
  document.getElementById('inp_idmunicipalidades').value=$(datospr).children('td[id="td_idMunicipalidades"]').html(); 
  document.getElementById('inp_municipio').value=$(datospr).children('td[id="td_municipalidad"]').html();
  document.getElementById('inp_telefonomunicipio').value=$(datospr).children('td[id="td_telefono"]').html();
  document.getElementById('inp_direccionmunicipio').value=$(datospr).children('td[id="td_direccion"]').html();
  document.getElementById('combo_idmunicipalidades_Ciudades').value=$(datospr).children('td[id="td_idciudades"]').html();
  document.getElementById('btn_guardar_municipalidades').innerHTML = "<p style='display:none;' id='accion_guardar_municipalidades'>editar</p>EDITAR";
  abrir_cerrar_ventanas_municipalidades("4");
}





/*AÑADIR O MODIFICAR NUEVO PLAN MULTAS*/
function add_datos_planmultas(datos){
	var f= new Date
	var id_progreso=f.getMinutes()+"_"+f.getMilliseconds()+"_mensaje";
	var idplanmultas=document.getElementById('inp_idplanmultas').value;
	var planmultas=document.getElementById('inp_planmultas').value;
	var precio=document.getElementById('inp_precioplanmultas').value;
    var accion='guardar';
	
	if($(datos).children('p[id="accion_guardar_planmultas"]').html()=='guardar'){
		accion='guardar';
	}
	if($(datos).children('p[id="accion_guardar_planmultas"]').html()=='editar'){
		accion='editar';
	}
	if(datos=='eliminar'){
		accion='eliminar';
	}

	 
			ver_vetana_informativa("Cargando....",id_progreso);
		
		
			  var datos = new FormData();
			 datos.append("func", accion)
			 datos.append("idplanmultas" , idplanmultas)
			 datos.append("descripcion" , planmultas)
			 datos.append("precio" , precio)
			
	
			var OpAjax= $.ajax({
			
			data: datos,
			url: "./php/abmPlanesMultas.php",
			type:"post",
	        cache:false,
			contentType: false,
			processData: false,
				error: function(jqXHR, textstatus, errorThrowm){
					cerrar_esta_ventanas(id_progreso);
					
					ver_vetana_informativa("ERROR DE CONEXIÓN...!",id_progreso) 
					

					 return false;
			},
			success: function(responseText)
			{ 	 

			Respuesta=responseText;			
			console.log(Respuesta);
			
	  if (Respuesta=="camposvacio"){
		ver_vetana_informativa("FALTÓ COMPLETAR ALGUN CAMPO",id_progreso);	
						return false;
		}
		if (Respuesta=="duplicado"){
				ver_vetana_informativa("DATO DUPLICADO",id_progreso);
						return false;
		}
	if(Respuesta=="in"){
		ver_vetana_informativa("DATO INCORRECTO",id_progreso);
		return false();
	} 
	  
			if (Respuesta=="exito") {	
			
			if(accion=='guardar'){
				ver_vetana_informativa("DATOS REGISTRADO CORRECTAMENTE",id_progreso)
				 limpiar_campos_planmultas();
				 buscar_datos_planmultas("ACTIVO");
			}
			if(accion=='editar'){
				ver_vetana_informativa("DATOS ACTUALIZADO CORRECTAMENTE",id_progreso)
				 limpiar_campos_planmultas();
				 buscar_datos_planmultas("ACTIVO");
			}
			if(accion=='eliminar'){
				ver_vetana_informativa("DATOS ELIMINADO CORRECTAMENTE",id_progreso)
				 limpiar_campos_planmultas();
				 buscar_datos_planmultas("ACTIVO");
			}
			
			} else {
		
				 ver_vetana_informativa("LO SENTIMOS OCURRIO ALGO INESPERADO!",id_progreso)
				 limpiar_campos_planmultas();
			}		
			}
			});		
}

function limpiar_campos_planmultas(){
	 
	document.getElementById('inp_idplanmultas').value=''
	document.getElementById('inp_planmultas').value=''
	document.getElementById('inp_precioplanmultas').value=''
   document.getElementById('btn_guardar_planmultas').innerHTML = "<p style='display:none;' id='accion_guardar_planmultas'>guardar</p>GUARDAR";
}

var estado_planmultas='ACTIVO';
function buscar_por_opciones_planmultas(d){
	if(d=="1"){
	estado_planmultas='ACTIVO';
    buscar_datos_planmultas(estado_planmultas);
	abrir_cerrar_ventanas_planmultas("6");
	}
	if(d=="2"){
	estado_planmultas='ELIMINADO';
	 buscar_datos_planmultas(estado_planmultas);
    abrir_cerrar_ventanas_planmultas("6");	
	}
	
}
//busccar datos regiones
function buscar_datos_planmultas(buscar2){
 	
var buscador=document.getElementById('inpt_buscador_planmultas').value
		 document.getElementById("cnt_listado_planmultas1").innerHTML=""
			var datos = {
			"buscar": buscador,
			"buscar2": buscar2,
			"func": "buscar"
			};
	 $.ajax({
			data: datos,url: "./php/abmPlanesMultas.php",type:"post",beforeSend: function(){
				
			},error: function(jqXHR, textstatus, errorThrowm){
	
			document.getElementById("cnt_listado_planmultas1").innerHTML=''
			},
			success: function(responseText)
			{
	
			var Respuesta=responseText;
     console.log(Respuesta)
			  document.getElementById("cnt_listado_planmultas1").innerHTML=''
			
			
			if (Respuesta != "error")
			{		
				try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
		  var datos_buscados=Respuesta;
		 
			document.getElementById("cnt_listado_planmultas1").innerHTML=datos_buscados
			document.getElementById("lbltotalplanmultas").innerHTML="CANTIDAD: "+datos["2"];
} catch(error)
				{
					
				}
	  
			}
			}
			});
}

function obtener_datos_planmultas(datospr){
  document.getElementById('inp_idplanmultas').value=$(datospr).children('td[id="td_idplanmultas"]').html(); 
  document.getElementById('inp_planmultas').value=$(datospr).children('td[id="td_planmultas"]').html();
  document.getElementById('inp_precioplanmultas').value=$(datospr).children('td[id="td_precioplanmultas"]').html();
  document.getElementById('btn_guardar_planmultas').innerHTML = "<p style='display:none;' id='accion_guardar_planmultas'>editar</p>EDITAR";
  abrir_cerrar_ventanas_planmultas("4");
}





/*AÑADIR O MODIFICAR NUEVO TIPOS ACTIVIDADES*/
function add_datos_tiposactividades(datos){
	var f= new Date
	var id_progreso=f.getMinutes()+"_"+f.getMilliseconds()+"_mensaje";
	var idtiposactividades=document.getElementById('inp_idtiposactividades').value;
	var tiposactividades=document.getElementById('inp_tiposactividades').value;
    var accion='guardar';
	
	if($(datos).children('p[id="accion_guardar_tiposactividades"]').html()=='guardar'){
		accion='guardar';
	}
	if($(datos).children('p[id="accion_guardar_tiposactividades"]').html()=='editar'){
		accion='editar';
	}
	if(datos=='eliminar'){
		accion='eliminar';
	}

	 
			ver_vetana_informativa("Cargando....",id_progreso);
		
		
			  var datos = new FormData();
			 datos.append("func", accion)
			 datos.append("idtiposactividades" , idtiposactividades)
			 datos.append("tipos" , tiposactividades)
			
		
			
			var OpAjax= $.ajax({
			
			data: datos,
			url: "./php/abmTiposActividades.php",
			type:"post",
	        cache:false,
			contentType: false,
			processData: false,
				error: function(jqXHR, textstatus, errorThrowm){
					cerrar_esta_ventanas(id_progreso);
					
					ver_vetana_informativa("ERROR DE CONEXIÓN...!",id_progreso) 
					

					 return false;
			},
			success: function(responseText)
			{ 	 

			Respuesta=responseText;			
			console.log(Respuesta);
			
	  if (Respuesta=="camposvacio"){
		ver_vetana_informativa("FALTÓ COMPLETAR ALGUN CAMPO",id_progreso);	
						return false;
		}
		if (Respuesta=="duplicado"){
				ver_vetana_informativa("DATO DUPLICADO",id_progreso);
						return false;
		}
	if(Respuesta=="in"){
		ver_vetana_informativa("DATO INCORRECTO",id_progreso);
		return false();
	} 
	  
			if (Respuesta=="exito") {	
			
			if(accion=='guardar'){
				ver_vetana_informativa("DATOS REGISTRADO CORRECTAMENTE",id_progreso)
				 limpiar_campos_tiposactividades();
				 buscar_datos_tiposactividades("ACTIVO");
			}
			if(accion=='editar'){
				ver_vetana_informativa("DATOS ACTUALIZADO CORRECTAMENTE",id_progreso)
				 limpiar_campos_tiposactividades();
				 buscar_datos_tiposactividades("ACTIVO");
			}
			if(accion=='eliminar'){
				ver_vetana_informativa("DATOS ELIMINADO CORRECTAMENTE",id_progreso)
				 limpiar_campos_tiposactividades();
				 buscar_datos_tiposactividades("ACTIVO");
			}
			
			} else {
		
				 ver_vetana_informativa("LO SENTIMOS OCURRIO ALGO INESPERADO!",id_progreso)
				 limpiar_campos_tiposactividades();
			}		
			}
			});		
}

function limpiar_campos_tiposactividades(){
	 
	document.getElementById('inp_idtiposactividades').value=''
	document.getElementById('inp_tiposactividades').value=''
   document.getElementById('btn_guardar_tiposactividades').innerHTML = "<p style='display:none;' id='accion_guardar_tiposactividades'>guardar</p>GUARDAR";
}

var estado_tiposactividades='ACTIVO';
function buscar_por_opciones_tiposactividades(d){
	if(d=="1"){
	estado_tiposactividades='ACTIVO';
    buscar_datos_tiposactividades(estado_tiposactividades);
	abrir_cerrar_ventanas_tiposactividades("6");
	}
	if(d=="2"){
	estado_tiposactividades='ELIMINADO';
	 buscar_datos_tiposactividades(estado_tiposactividades);
    abrir_cerrar_ventanas_tiposactividades("6");	
	}
	
}
//busccar datos regiones
function buscar_datos_tiposactividades(buscar2){
 	
var buscador=document.getElementById('inpt_buscador_tiposactividades').value
		 document.getElementById("cnt_listado_tiposactividades1").innerHTML=""
			var datos = {
			"buscar": buscador,
			"buscar2": buscar2,
			"func": "buscar"
			};
	 $.ajax({
			data: datos,url: "./php/abmTiposActividades.php",type:"post",beforeSend: function(){
				
			},error: function(jqXHR, textstatus, errorThrowm){
	
			document.getElementById("cnt_listado_tiposactividades1").innerHTML=''
			},
			success: function(responseText)
			{
	
			var Respuesta=responseText;
     console.log(Respuesta)
			  document.getElementById("cnt_listado_tiposactividades1").innerHTML=''
			
			
			if (Respuesta != "error")
			{		
				try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
		  var datos_buscados=Respuesta;
		 
			document.getElementById("cnt_listado_tiposactividades1").innerHTML=datos_buscados
			document.getElementById("lbltotaltiposactividades").innerHTML="CANTIDAD: "+datos["2"];
} catch(error)
				{
					
				}
	  
			}
			}
			});
}

function obtener_datos_tiposactividades(datospr){
  document.getElementById('inp_idtiposactividades').value=$(datospr).children('td[id="td_idtiposactividades"]').html(); 
  document.getElementById('inp_tiposactividades').value=$(datospr).children('td[id="td_tiposactividades"]').html();
  document.getElementById('btn_guardar_tiposactividades').innerHTML = "<p style='display:none;' id='accion_guardar_tiposactividades'>editar</p>EDITAR";
  abrir_cerrar_ventanas_tiposactividades("4");
}




/*AÑADIR O MODIFICAR NUEVO CATEGORIAS*/
function add_datos_categorias(datos){
	var f= new Date
	var id_progreso=f.getMinutes()+"_"+f.getMilliseconds()+"_mensaje";
	var idcategorias=document.getElementById('inp_idcategorias').value;
	var categorias=document.getElementById('inp_categorias').value;
    var accion='guardar';
	
	if($(datos).children('p[id="accion_guardar_categorias"]').html()=='guardar'){
		accion='guardar';
	}
	if($(datos).children('p[id="accion_guardar_categorias"]').html()=='editar'){
		accion='editar';
	}
	if(datos=='eliminar'){
		accion='eliminar';
	}

	 
			ver_vetana_informativa("Cargando....",id_progreso);
		
		
			  var datos = new FormData();
			 datos.append("func", accion)
			 datos.append("idcategorias" , idcategorias)
			 datos.append("categorias" , categorias)
			
		
			
			var OpAjax= $.ajax({
			
			data: datos,
			url: "./php/abmcategorias.php",
			type:"post",
	        cache:false,
			contentType: false,
			processData: false,
				error: function(jqXHR, textstatus, errorThrowm){
					cerrar_esta_ventanas(id_progreso);
					
					ver_vetana_informativa("ERROR DE CONEXIÓN...!",id_progreso) 
					

					 return false;
			},
			success: function(responseText)
			{ 	 

			Respuesta=responseText;			
			console.log(Respuesta);
			
	  if (Respuesta=="camposvacio"){
		ver_vetana_informativa("FALTÓ COMPLETAR ALGUN CAMPO",id_progreso);	
						return false;
		}
		if (Respuesta=="duplicado"){
				ver_vetana_informativa("DATO DUPLICADO",id_progreso);
						return false;
		}
	if(Respuesta=="in"){
		ver_vetana_informativa("DATO INCORRECTO",id_progreso);
		return false();
	} 
	  
			if (Respuesta=="exito") {	
			
			if(accion=='guardar'){
				ver_vetana_informativa("DATOS REGISTRADO CORRECTAMENTE",id_progreso)
				 limpiar_campos_categorias();
				 buscar_datos_categorias("ACTIVO");
			}
			if(accion=='editar'){
				ver_vetana_informativa("DATOS ACTUALIZADO CORRECTAMENTE",id_progreso)
				 limpiar_campos_categorias();
				 buscar_datos_categorias("ACTIVO");
			}
			if(accion=='eliminar'){
				ver_vetana_informativa("DATOS ELIMINADO CORRECTAMENTE",id_progreso)
				 limpiar_campos_categorias();
				 buscar_datos_categorias("ACTIVO");
			}
			
			} else {
		
				 ver_vetana_informativa("LO SENTIMOS OCURRIO ALGO INESPERADO!",id_progreso)
				 limpiar_campos_categorias();
			}		
			}
			});		
}

function limpiar_campos_categorias(){
	 
	document.getElementById('inp_idcategorias').value=''
	document.getElementById('inp_categorias').value=''
   document.getElementById('btn_guardar_categorias').innerHTML = "<p style='display:none;' id='accion_guardar_categorias'>guardar</p>GUARDAR";
}

var estado_categorias='ACTIVO';
function buscar_por_opciones_categorias(d){
	if(d=="1"){
	estado_categorias='ACTIVO';
    buscar_datos_categorias(estado_categorias);
	abrir_cerrar_ventanas_categorias("6");
	}
	if(d=="2"){
	estado_categorias='ELIMINADO';
	 buscar_datos_categorias(estado_categorias);
    abrir_cerrar_ventanas_categorias("6");	
	}
	
}
//busccar datos regiones
function buscar_datos_categorias(buscar2){
 	
var buscador=document.getElementById('inpt_buscador_categorias').value
		 document.getElementById("cnt_listado_categorias1").innerHTML=""
			var datos = {
			"buscar": buscador,
			"buscar2": buscar2,
			"func": "buscar"
			};
	 $.ajax({
			data: datos,url: "./php/abmcategorias.php",type:"post",beforeSend: function(){
				
			},error: function(jqXHR, textstatus, errorThrowm){
	
			document.getElementById("cnt_listado_categorias1").innerHTML=''
			},
			success: function(responseText)
			{
	
			var Respuesta=responseText;
     console.log(Respuesta)
			  document.getElementById("cnt_listado_categorias1").innerHTML=''
			
			
			if (Respuesta != "error")
			{		
				try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
		  var datos_buscados=Respuesta;
		 
			document.getElementById("cnt_listado_categorias1").innerHTML=datos_buscados
			document.getElementById("lbltotalcategorias").innerHTML="CANTIDAD: "+datos["2"];
} catch(error)
				{
					
				}
	  
			}
			}
			});
}

function obtener_datos_categorias(datospr){
  document.getElementById('inp_idcategorias').value=$(datospr).children('td[id="td_idcategorias"]').html(); 
  document.getElementById('inp_categorias').value=$(datospr).children('td[id="td_categorias"]').html();
  document.getElementById('btn_guardar_categorias').innerHTML = "<p style='display:none;' id='accion_guardar_categorias'>editar</p>EDITAR";
  abrir_cerrar_ventanas_categorias("4");
}



/*AÑADIR O MODIFICAR NUEVO CARGOS O  ACCESOS*/
function add_datos_accesos(datos){
	var f= new Date
	var id_progreso=f.getMinutes()+"_"+f.getMilliseconds()+"_mensaje";
	var idaccesos=document.getElementById('inp_idaccesos').value;
	var accesos=document.getElementById('inp_accesos').value;
    var accion='guardar';
	
	if($(datos).children('p[id="accion_guardar_accesos"]').html()=='guardar'){
		accion='guardar';
	}
	if($(datos).children('p[id="accion_guardar_accesos"]').html()=='editar'){
		accion='editar';
	}
	if(datos=='eliminar'){
		accion='eliminar';
	}

	 
			ver_vetana_informativa("Cargando....",id_progreso);
		
		
			  var datos = new FormData();
			 datos.append("func", accion)
			 datos.append("idaccesos" , idaccesos)
			 datos.append("accesos" , accesos)
			
		
			
			var OpAjax= $.ajax({
			
			data: datos,
			url: "./php/abmCargos.php",
			type:"post",
	        cache:false,
			contentType: false,
			processData: false,
				error: function(jqXHR, textstatus, errorThrowm){
					cerrar_esta_ventanas(id_progreso);
					
					ver_vetana_informativa("ERROR DE CONEXIÓN...!",id_progreso) 
					

					 return false;
			},
			success: function(responseText)
			{ 	 

			Respuesta=responseText;			
			console.log(Respuesta);
			
	  if (Respuesta=="camposvacio"){
		ver_vetana_informativa("FALTÓ COMPLETAR ALGUN CAMPO",id_progreso);	
						return false;
		}
		if (Respuesta=="duplicado"){
				ver_vetana_informativa("DATO DUPLICADO",id_progreso);
						return false;
		}
	if(Respuesta=="in"){
		ver_vetana_informativa("DATO INCORRECTO",id_progreso);
		return false();
	} 
	  
			if (Respuesta=="exito") {	
			
			if(accion=='guardar'){
				ver_vetana_informativa("DATOS REGISTRADO CORRECTAMENTE",id_progreso)
				 limpiar_campos_accesos();
				 buscar_datos_accesos("ACTIVO");
			}
			if(accion=='editar'){
				ver_vetana_informativa("DATOS ACTUALIZADO CORRECTAMENTE",id_progreso)
				 limpiar_campos_accesos();
				 buscar_datos_accesos("ACTIVO");
			}
			if(accion=='eliminar'){
				ver_vetana_informativa("DATOS ELIMINADO CORRECTAMENTE",id_progreso)
				 limpiar_campos_accesos();
				 buscar_datos_accesos("ACTIVO");
			}
			
			} else {
		
				 ver_vetana_informativa("LO SENTIMOS OCURRIO ALGO INESPERADO!",id_progreso)
				 limpiar_campos_accesos();
			}		
			}
			});		
}

function limpiar_campos_accesos(){
	 
	document.getElementById('inp_idaccesos').value=''
	document.getElementById('inp_accesos').value=''
   document.getElementById('btn_guardar_accesos').innerHTML = "<p style='display:none;' id='accion_guardar_accesos'>guardar</p>GUARDAR";
}

var estado_accesos='ACTIVO';
function buscar_por_opciones_accesos(d){
	if(d=="1"){
	estado_accesos='ACTIVO';
    buscar_datos_accesos(estado_accesos);
	abrir_cerrar_ventanas_accesos("6");
	}
	if(d=="2"){
	estado_accesos='ELIMINADO';
	 buscar_datos_accesos(estado_accesos);
    abrir_cerrar_ventanas_accesos("6");	
	}
	
}
//busccar datos regiones
function buscar_datos_accesos(buscar2){
 	
var buscador=document.getElementById('inpt_buscador_accesos').value
		 document.getElementById("cnt_listado_accesos1").innerHTML=""
			var datos = {
			"buscar": buscador,
			"buscar2": buscar2,
			"func": "buscar"
			};
	 $.ajax({
			data: datos,url: "./php/abmCargos.php",type:"post",beforeSend: function(){
				
			},error: function(jqXHR, textstatus, errorThrowm){
	
			document.getElementById("cnt_listado_accesos1").innerHTML=''
			},
			success: function(responseText)
			{
	
			var Respuesta=responseText;
     console.log(Respuesta)
			  document.getElementById("cnt_listado_accesos1").innerHTML=''
			
			
			if (Respuesta != "error")
			{		
				try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
		  var datos_buscados=Respuesta;
		 
			document.getElementById("cnt_listado_accesos1").innerHTML=datos_buscados
			document.getElementById("lbltotalaccesos").innerHTML="CANTIDAD: "+datos["2"];
} catch(error)
				{
					
				}
	  
			}
			}
			});
}

function obtener_datos_accesos(datospr){
  document.getElementById('inp_idaccesos').value=$(datospr).children('td[id="td_idaccesos"]').html(); 
  document.getElementById('inp_accesos').value=$(datospr).children('td[id="td_accesos"]').html();
  document.getElementById('btn_guardar_accesos').innerHTML = "<p style='display:none;' id='accion_guardar_accesos'>editar</p>EDITAR";
  abrir_cerrar_ventanas_accesos("4");
}


/*AÑADIR O MODIFICAR NUEVO MARCAS*/
function add_datos_marcas(datos){
	var f= new Date
	var id_progreso=f.getMinutes()+"_"+f.getMilliseconds()+"_mensaje";
	var idmarcas=document.getElementById('inp_idmarcas').value;
	var marcas=document.getElementById('inp_marcas').value;
    var accion='guardar';
	
	if($(datos).children('p[id="accion_guardar_marcas"]').html()=='guardar'){
		accion='guardar';
	}
	if($(datos).children('p[id="accion_guardar_marcas"]').html()=='editar'){
		accion='editar';
	}
	if(datos=='eliminar'){
		accion='eliminar';
	}

	 
			ver_vetana_informativa("Cargando....",id_progreso);
		
		
			  var datos = new FormData();
			 datos.append("func", accion)
			 datos.append("idmarcas" , idmarcas)
			 datos.append("marcas" , marcas)
			
		
			
			var OpAjax= $.ajax({
			
			data: datos,
			url: "./php/abmMarcas.php",
			type:"post",
	        cache:false,
			contentType: false,
			processData: false,
				error: function(jqXHR, textstatus, errorThrowm){
					cerrar_esta_ventanas(id_progreso);
					
					ver_vetana_informativa("ERROR DE CONEXIÓN...!",id_progreso) 
					

					 return false;
			},
			success: function(responseText)
			{ 	 

			Respuesta=responseText;			
			console.log(Respuesta);
			
	  if (Respuesta=="camposvacio"){
		ver_vetana_informativa("FALTÓ COMPLETAR ALGUN CAMPO",id_progreso);	
						return false;
		}
		if (Respuesta=="duplicado"){
				ver_vetana_informativa("DATO DUPLICADO",id_progreso);
						return false;
		}
	if(Respuesta=="in"){
		ver_vetana_informativa("DATO INCORRECTO",id_progreso);
		return false();
	} 
	  
			if (Respuesta=="exito") {	
			
			if(accion=='guardar'){
				ver_vetana_informativa("DATOS REGISTRADO CORRECTAMENTE",id_progreso)
				 limpiar_campos_marcas();
				 buscar_datos_marcas("ACTIVO");
			}
			if(accion=='editar'){
				ver_vetana_informativa("DATOS ACTUALIZADO CORRECTAMENTE",id_progreso)
				 limpiar_campos_marcas();
				 buscar_datos_marcas("ACTIVO");
			}
			if(accion=='eliminar'){
				ver_vetana_informativa("DATOS ELIMINADO CORRECTAMENTE",id_progreso)
				 limpiar_campos_marcas();
				 buscar_datos_marcas("ACTIVO");
			}
			
			} else {
		
				 ver_vetana_informativa("LO SENTIMOS OCURRIO ALGO INESPERADO!",id_progreso)
				 limpiar_campos_marcas();
			}		
			}
			});		
}

function limpiar_campos_marcas(){
	 
	document.getElementById('inp_idmarcas').value=''
	document.getElementById('inp_marcas').value=''
   document.getElementById('btn_guardar_marcas').innerHTML = "<p style='display:none;' id='accion_guardar_marcas'>guardar</p>GUARDAR";
}

var estado_marcas='ACTIVO';
function buscar_por_opciones_marcas(d){
	if(d=="1"){
	estado_marcas='ACTIVO';
    buscar_datos_marcas(estado_marcas);
	abrir_cerrar_ventanas_marcas("6");
	}
	if(d=="2"){
	estado_marcas='ELIMINADO';
	 buscar_datos_marcas(estado_marcas);
    abrir_cerrar_ventanas_marcas("6");	
	}
	
}
//busccar datos regiones
function buscar_datos_marcas(buscar2){
 	
var buscador=document.getElementById('inpt_buscador_marcas').value
		 document.getElementById("cnt_listado_marcas1").innerHTML=""
			var datos = {
			"buscar": buscador,
			"buscar2": buscar2,
			"func": "buscar"
			};
	 $.ajax({
			data: datos,url: "./php/abmMarcas.php",type:"post",beforeSend: function(){
				
			},error: function(jqXHR, textstatus, errorThrowm){
	
			document.getElementById("cnt_listado_marcas1").innerHTML=''
			},
			success: function(responseText)
			{
	
			var Respuesta=responseText;
     console.log(Respuesta)
			  document.getElementById("cnt_listado_marcas1").innerHTML=''
			
			
			if (Respuesta != "error")
			{		
				try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
		  var datos_buscados=Respuesta;
		 
			document.getElementById("cnt_listado_marcas1").innerHTML=datos_buscados
			document.getElementById("lbltotalmarcas").innerHTML="CANTIDAD: "+datos["2"];
} catch(error)
				{
					
				}
	  
			}
			}
			});
}

function obtener_datos_marcas(datospr){
  document.getElementById('inp_idmarcas').value=$(datospr).children('td[id="td_idmarcas"]').html(); 
  document.getElementById('inp_marcas').value=$(datospr).children('td[id="td_marcas"]').html();
  document.getElementById('btn_guardar_marcas').innerHTML = "<p style='display:none;' id='accion_guardar_marcas'>editar</p>EDITAR";
  abrir_cerrar_ventanas_marcas("4");
}





/*AÑADIR O MODIFICAR NUEVO PAISES*/








/*AÑADIR O MODIFICAR NUEVO REGION*/

function add_datos_regiones(datos){
	var f= new Date
	var id_progreso=f.getMinutes()+"_"+f.getMilliseconds()+"_mensaje";
	var idregiones=document.getElementById('inp_idregiones').value;
	var regiones=document.getElementById('inp_regiones').value;
    var accion='guardar';
	
	if($(datos).children('p[id="accion_guardar_regiones"]').html()=='guardar'){
		accion='guardar';
	}
	if($(datos).children('p[id="accion_guardar_regiones"]').html()=='editar'){
		accion='editar';
	}
	if(datos=='eliminar'){
		accion='eliminar';
	}

	 
			ver_vetana_informativa("Cargando....",id_progreso);
		
		
			  var datos = new FormData();
			 datos.append("func", accion)
			 datos.append("idregiones" , idregiones)
			 datos.append("regiones" , regiones)
			
		
			
			var OpAjax= $.ajax({
			
			data: datos,
			url: "./php/abmRegiones.php",
			type:"post",
	        cache:false,
			contentType: false,
			processData: false,
				error: function(jqXHR, textstatus, errorThrowm){
					cerrar_esta_ventanas(id_progreso);
					
					ver_vetana_informativa("ERROR DE CONEXIÓN...!",id_progreso) 
					

					 return false;
			},
			success: function(responseText)
			{ 	 

			Respuesta=responseText;			
			console.log(Respuesta);
			
	  if (Respuesta=="camposvacio"){
		ver_vetana_informativa("FALTÓ COMPLETAR ALGUN CAMPO",id_progreso);	
						return false;
		}
		if (Respuesta=="duplicado"){
				ver_vetana_informativa("DATO DUPLICADO",id_progreso);
						return false;
		}
	if(Respuesta=="in"){
		ver_vetana_informativa("DATO INCORRECTO",id_progreso);
		return false();
	} 
	  
			if (Respuesta=="exito") {	
			
			if(accion=='guardar'){
				ver_vetana_informativa("DATOS REGISTRADO CORRECTAMENTE",id_progreso)
				 limpiar_campos_regiones();
				 buscar_datos_regiones("ACTIVO");
			}
			if(accion=='editar'){
				ver_vetana_informativa("DATOS ACTUALIZADO CORRECTAMENTE",id_progreso)
				 limpiar_campos_regiones();
				 buscar_datos_regiones("ACTIVO");
			}
			if(accion=='eliminar'){
				ver_vetana_informativa("DATOS ELIMINADO CORRECTAMENTE",id_progreso)
				 limpiar_campos_regiones();
				 buscar_datos_regiones("ACTIVO");
			}
			
			} else {
		
				 ver_vetana_informativa("LO SENTIMOS OCURRIO ALGO INESPERADO!",id_progreso)
				 limpiar_campos_regiones();
			}		
			}
			});		
}

function limpiar_campos_regiones(){
	 
	document.getElementById('inp_idregiones').value=''
	document.getElementById('inp_regiones').value=''
   document.getElementById('btn_guardar_regiones').innerHTML = "<p style='display:none;' id='accion_guardar_regiones'>guardar</p>GUARDAR";
}

var tipoestado='ACTIVO';
function buscar_por_opciones_regiones(d){
	if(d=="1"){
	tipoestado='ACTIVO';
    buscar_datos_regiones(tipoestado);
	abrir_cerrar_ventanas_regiones("6");
	}
	if(d=="2"){
	tipoestado='ELIMINADO';
	 buscar_datos_regiones(tipoestado);
    abrir_cerrar_ventanas_regiones("6");	
	}
	
}
//busccar datos regiones
function buscar_datos_regiones(buscar2){
 	
var buscador=document.getElementById('inpt_buscador_regiones').value
		 document.getElementById("cnt_listado_regiones").innerHTML=""
			var datos = {
			"buscar": buscador,
			"buscar2": buscar2,
			"func": "buscar"
			};
	 $.ajax({
			data: datos,url: "./php/abmRegiones.php",type:"post",beforeSend: function(){
				
			},error: function(jqXHR, textstatus, errorThrowm){
	
			document.getElementById("cnt_listado_regiones").innerHTML=''
			},
			success: function(responseText)
			{
	
			var Respuesta=responseText;
     console.log(Respuesta)
			  document.getElementById("cnt_listado_regiones").innerHTML=''
			
			
			if (Respuesta != "error")
			{		
				try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
		  var datos_buscados=Respuesta;
		 
			document.getElementById("cnt_listado_regiones").innerHTML=datos_buscados
} catch(error)
				{
					
				}
	  
			}
			}
			});
	
	
}

function obtener_datos_regiones(datospr){
  document.getElementById('inp_idregiones').value= $(datospr).children('td[id="td_idregiones"]').html();
  document.getElementById('inp_regiones').value= $(datospr).children('td[id="td_regiones"]').html();	
  document.getElementById('btn_guardar_regiones').innerHTML = "<p style='display:none;' id='accion_guardar_regiones'>editar</p>EDITAR";
  abrir_cerrar_ventanas_regiones("4");
}





/*AÑADIR O MODIFICAR NUEVO DEPARTAMENTOS*/

function add_datos_departamentos(datos) {
	var f = new Date
	var id_progreso = f.getMinutes() + "_" + f.getMilliseconds() + "_mensaje";
	var iddepartamentos = document.getElementById('inp_iddepartamentos').value
	var departamentos = document.getElementById('inp_departamentos').value
	var regiones_idregiones = document.getElementById('combo_idregiones_departamentos').value
	var paises_idpaises = 	'PARAGUAY'
	
	var accion = 'guardar'
	if ($(datos).children('p[id="accion_guardar_departamentos"]').html() == 'guardar') {
		accion = 'guardar'
	}
	if ($(datos).children('p[id="accion_guardar_departamentos"]').html() == 'editar') {
		accion = 'editar'
	} 
	if (datos == 'eliminar'){
		accion = 'eliminar'
	}
	ver_vetana_informativa("Cargando....", id_progreso);
	var datos = new FormData();
	datos.append("func", accion)
	datos.append("iddepartamentos", iddepartamentos)
	datos.append("departamentos", departamentos)
	datos.append("paises_idpaises", paises_idpaises)
	datos.append("regiones_idregiones", regiones_idregiones)


	var OpAjax = $.ajax({

		data: datos,
		url: "./php/abmDepartamentos.php",
		type: "post",
		cache: false,
		contentType: false,
		processData: false,
		error: function (jqXHR, textstatus, errorThrowm) {
			cerrar_esta_ventanas(id_progreso);
			ver_vetana_informativa("ERROR DE CONEXIÓN...!", id_progreso)


			return false;
		},
		success: function (responseText) {

			Respuesta = responseText;
			console.log(Respuesta);

			if (Respuesta == "camposvacio") {
				ver_vetana_informativa("FALTÓ COMPLETAR ALGUN CAMPO", id_progreso);
				return false;
			}
			if (Respuesta == "duplicado") {
				ver_vetana_informativa("DATO DUPLICADO", id_progreso);
				return false;
			}
			if (Respuesta == "in") {
				ver_vetana_informativa("DATO INCORRECTO", id_progreso);
				return false();
			}

			if (Respuesta == "exito") {

				if (accion == 'guardar') {
					ver_vetana_informativa("DATOS REGISTRADO CORRECTAMENTE", id_progreso)
					limpiar_campos_departamentos();
					buscar_datos_departamentos("ACTIVO");
				} 
				if (accion == 'editar') {
					ver_vetana_informativa("DATOS ACTUALIZADO CORRECTAMENTE", id_progreso)
					limpiar_campos_departamentos();
					buscar_datos_departamentos("ACTIVO");
				} 
				if (accion == 'eliminar') {
					ver_vetana_informativa("DATOS ELIMINADO CORRECTAMENTE", id_progreso)
					limpiar_campos_departamentos();
					buscar_datos_departamentos("ACTIVO");
				}

			} else {

				ver_vetana_informativa("LO SENTIMOS OCURRIO ALGO INESPERADO!", id_progreso)
				limpiar_campos_departamentos();
			}
		}
	});


}

function limpiar_campos_departamentos() {

	document.getElementById('inp_iddepartamentos').value = ''
	document.getElementById('inp_departamentos').value = ''
    //document.getElementById('combo_idpaises_departamentos').value='PARAGUAY'
	document.getElementById('combo_idregiones_departamentos').value = ''
	document.getElementById('btn_guardar_departamentos').innerHTML = "<p style='display:none;' id='accion_guardar_departamentos'>guardar</p>GUARDAR";
	
}

var tipoestado_departamento = 'ACTIVO';
function buscar_por_opciones_departamentos(d) {
	if (d == "1") {
		tipoestado_departamento = 'ACTIVO';
		buscar_datos_departamentos(tipoestado_departamento);
		abrir_cerrar_ventanas_departamentos("6");
	}
	if (d == "2") {
		tipoestado_departamento = 'ELIMINADO';
		buscar_datos_departamentos(tipoestado_departamento);
		abrir_cerrar_ventanas_departamentos("6");
	}

}

//busccar datos departamentos
function buscar_datos_departamentos(buscar2) {

	var buscador = document.getElementById('inpt_buscador_departamentos').value
	document.getElementById("cnt_listado_departamentos").innerHTML = ""
	var datos = {
		"buscar": buscador,
		"buscar2": buscar2,
		"func": "buscar"
	};
	$.ajax({
		data: datos, url: "./php/abmDepartamentos.php", type: "post", beforeSend: function () {

		}, error: function (jqXHR, textstatus, errorThrowm) {

			document.getElementById("cnt_listado_departamentos").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("cnt_listado_departamentos").innerHTML = ''


			if (Respuesta != "error") {
				try {
					var datos = $.parseJSON(Respuesta);
					Respuesta = datos["1"];
					var datos_buscados = Respuesta;

					document.getElementById("cnt_listado_departamentos").innerHTML = datos_buscados
				} catch (error) {

				}

			}
		}
	});


}

/*buscar Departamento*/
function buscarDepartametos_combo() {
	var datos = new FormData();
	datos.append("func" , "buscarcombo")
	var OpAjax = $.ajax({
		data: datos,
		url: "./php/abmRegiones.php",
		type: "post",
		cache: false,
		contentType: false,
		processData: false,
		error: function (jqXHR, textstatus, errorThrowm) {
			ver_vetana_informativa("ERROR DE CONEXIÓN...!", id_progreso)
			return false;
		},
		success: function (responseText) {

			Respuesta = responseText;
			console.log(Respuesta)
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				if (Respuesta == "exito") {

					document.getElementById('combo_idregiones_departamentos').innerHTML = datos[2]

				}
				else {
					ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR...!", id_progreso)
				
				}

			} catch (error) {
				ver_vetana_informativa("ERROR FATAL...!", id_progreso)
			

			}


		}
	});

}
/*buscar Departamento*/

/*buscar Departamento*/

function obtener_datos_departamentos(datospr) {
	document.getElementById('inp_iddepartamentos').value = $(datospr).children('td[id="td_iddepartamentos"]').html();
	document.getElementById('inp_departamentos').value = $(datospr).children('td[id="td_departamentos"]').html();
	document.getElementById('combo_idregiones_departamentos').value = $(datospr).children('td[id="td_regiones_idregiones"]').html();	
	document.getElementById('combo_idpaises_departamentos').value = $(datospr).children('td[id="td_paises_idpaises"]').html();	
	document.getElementById('btn_guardar_departamentos').innerHTML = "<p style='display:none;' id='accion_guardar_departamentos'>editar</p>EDITAR";
	abrir_cerrar_ventanas_departamentos("4");
}


/*AÑADIR O MODIFICAR NUEVO CIUDADES*/

function add_datos_Ciudades(datos) {
	var f = new Date
	var id_progreso = f.getMinutes() + "_" + f.getMilliseconds() + "_mensaje";
	var idciudades = document.getElementById('inp_idCiudades').value
	
	var ciudades = document.getElementById('inp_Ciudades').value
	var departamentos_iddepartamentos = document.getElementById('combo_iddepartamentos_Ciudades').value
	
	
	var accion = 'guardar'
	if ($(datos).children('p[id="accion_guardar_Ciudades"]').html() == 'guardar') {
		accion = 'guardar'
	}
	if ($(datos).children('p[id="accion_guardar_Ciudades"]').html() == 'editar') {
		accion = 'editar'
	} 
	if (datos == 'eliminar'){
		accion = 'eliminar'
	}
	ver_vetana_informativa("Cargando....", id_progreso);
	var datos = new FormData();
	datos.append("func", accion)
	datos.append("idciudades", idciudades)
	datos.append("ciudades", ciudades)
	datos.append("departamentos_iddepartamentos", departamentos_iddepartamentos)


	var OpAjax = $.ajax({

		data: datos,
		url: "./php/abmCiudades.php",
		type: "post",
		cache: false,
		contentType: false,
		processData: false,
		error: function (jqXHR, textstatus, errorThrowm) {
			cerrar_esta_ventanas(id_progreso);
			ver_vetana_informativa("ERROR DE CONEXIÓN...!", id_progreso)


			return false;
		},
		success: function (responseText) {

			Respuesta = responseText;
			console.log(Respuesta);

			if (Respuesta == "camposvacio") {
				ver_vetana_informativa("FALTÓ COMPLETAR ALGUN CAMPO", id_progreso);
				return false;
			}
			if (Respuesta == "duplicado") {
				ver_vetana_informativa("DATO DUPLICADO", id_progreso);
				return false;
			}
			if (Respuesta == "in") {
				ver_vetana_informativa("DATO INCORRECTO", id_progreso);
				return false();
			}

			if (Respuesta == "exito") {

				if (accion == 'guardar') {
					ver_vetana_informativa("DATOS REGISTRADO CORRECTAMENTE", id_progreso)
					limpiar_campos_Ciudades();
					buscar_datos_Ciudades("ACTIVO");
				} 
				if (accion == 'editar') {
					ver_vetana_informativa("DATOS ACTUALIZADO CORRECTAMENTE", id_progreso)
					limpiar_campos_Ciudades();
					buscar_datos_Ciudades("ACTIVO");
				} 
				if (accion == 'eliminar') {
					ver_vetana_informativa("DATOS ELIMINADO CORRECTAMENTE", id_progreso)
					limpiar_campos_Ciudades();
					buscar_datos_Ciudades("ACTIVO");
				}

			} else {

				ver_vetana_informativa("LO SENTIMOS OCURRIO ALGO INESPERADO!", id_progreso)
				limpiar_campos_Ciudades();
			}
		}
	});


}

function limpiar_campos_Ciudades() {

	document.getElementById('inp_idCiudades').value = ''
	document.getElementById('inp_Ciudades').value = ''
	document.getElementById('combo_iddepartamentos_Ciudades').value = ''
	document.getElementById('btn_guardar_Ciudades').innerHTML = "<p style='display:none;' id='accion_guardar_Ciudades'>guardar</p>GUARDAR";
	
}

var tipoestado_ciudades = 'ACTIVO';
function buscar_por_opciones_Ciudades(d) {
	if (d == "1") {
		tipoestado_ciudades = 'ACTIVO';
		buscar_datos_Ciudades(tipoestado_ciudades);
		abrir_cerrar_ventanas_Ciudades("6");
	}
	if (d == "2") {
		tipoestado_ciudades = 'ELIMINADO';
		buscar_datos_Ciudades(tipoestado_ciudades);
		abrir_cerrar_ventanas_Ciudades("6");
	}

}

//busccar datos ciudades
function buscar_datos_Ciudades(buscar2) {

	var buscador = document.getElementById('inpt_buscador_Ciudades').value
	document.getElementById("cnt_listado_Ciudades").innerHTML = ""
	var datos = {
		"buscar": buscador,
		"buscar2": buscar2,
		"func": "buscar"
	};
	$.ajax({
		data: datos, url: "./php/abmCiudades.php", type: "post", beforeSend: function () {

		}, error: function (jqXHR, textstatus, errorThrowm) {

			document.getElementById("cnt_listado_Ciudades").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("cnt_listado_Ciudades").innerHTML = ''


			if (Respuesta != "error") {
				try {
					var datos = $.parseJSON(Respuesta);
					Respuesta = datos["1"];
					var datos_buscados = Respuesta;

					document.getElementById("cnt_listado_Ciudades").innerHTML = datos_buscados
				} catch (error) {

				}

			}
		}
	});


}

/*buscar Ciudad*/
function buscarCiudades_combo() {
	var datos = new FormData();
	datos.append("func" , "buscarcombo")
	var OpAjax = $.ajax({
		data: datos,
		url: "./php/abmDepartamentos.php",
		type: "post",
		cache: false,
		contentType: false,
		processData: false,
		error: function (jqXHR, textstatus, errorThrowm) {
			ver_vetana_informativa("ERROR DE CONEXIÓN...!", id_progreso)
			return false;
		},
		success: function (responseText) {

			Respuesta = responseText;
			console.log(Respuesta)
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				if (Respuesta == "exito") {

					document.getElementById('combo_iddepartamentos_Ciudades').innerHTML = datos[2]

				}
				else {
					ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR...!", id_progreso)
				}
			   } catch (error) {
				ver_vetana_informativa("ERROR FATAL...!", id_progreso)
			}
		}
	});
}


function obtener_datos_Ciudades(datospr) {
	document.getElementById('inp_idCiudades').value = $(datospr).children('td[id="td_idCiudades"]').html();
	document.getElementById('inp_Ciudades').value = $(datospr).children('td[id="td_Ciudades"]').html();
	document.getElementById('combo_iddepartamentos_Ciudades').value = $(datospr).children('td[id="td_departamentos_iddepartamentos"]').html();	
	document.getElementById('btn_guardar_Ciudades').innerHTML = "<p style='display:none;' id='accion_guardar_Ciudades'>editar</p>EDITAR";
	abrir_cerrar_ventanas_Ciudades("4");
}


function cerrar_ventana_coord() {
	document.getElementById('coordinates').style.display='none';
}

/*buscar combo Usuarios*/
function buscarUsuarios_combo_usuario() {
	var datos = new FormData();
	datos.append("func" , "buscarcombousuario")
	var OpAjax = $.ajax({
		data: datos,
		url: "./php/abmUsuarios.php",
		type: "post",
		cache: false,
		contentType: false,
		processData: false,
		error: function (jqXHR, textstatus, errorThrowm) {
			ver_vetana_informativa("ERROR DE CONEXIÓN...!", id_progreso)
			return false;
		},
		success: function (responseText) {

			Respuesta = responseText;
			console.log(Respuesta)
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				if (Respuesta == "exito") {
					document.getElementById('combo_usuario_h_v_a').innerHTML = datos[2]
					document.getElementById('combo_usuario_h_r_a').innerHTML = datos[2]
					document.getElementById('combo_usuario_h_c_a').innerHTML = datos[2]
				}
				else {
					ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR...!", id_progreso)
				}
			   } catch (error) {
				ver_vetana_informativa("ERROR FATAL...!", id_progreso)
			}
		}
	});
}


/*AÑADIR O MODIFICAR NUEVO USUARIOS*/

function add_datos_Usuarios(datos) {
	var f = new Date
	var id_progreso = f.getMinutes() + "_" + f.getMilliseconds() + "_mensaje";
	var idUsuarios = document.getElementById('inp_idUsuarios').value
	var cedula = document.getElementById('inp_Cedula').value
	var nombres = document.getElementById('inp_Nombres').value
	var telefono = document.getElementById('inp_Telefono').value
	var direccion = document.getElementById('inp_Direccion').value
	var idciudades = document.getElementById('combo_idCiudades_usuarios').value
    var fecha_nac = document.getElementById('inp_FechaNac').value
    var user = document.getElementById('inp_user').value
    var pass = document.getElementById('inp_pass').value
    var idacceso = document.getElementById('combo_idacceso').value
    //var idmunicipalidades = document.getElementById('combo_idmunicipio').value
	
	var accion = 'guardar'
	if ($(datos).children('p[id="accion_guardar_Usuarios"]').html() == 'guardar') {
		accion = 'guardar'
	}
	if ($(datos).children('p[id="accion_guardar_Usuarios"]').html() == 'editar') {
		accion = 'editar'
	} 
	if (datos == 'eliminar'){
		accion = 'eliminar'
	}
	ver_vetana_informativa("Cargando....", id_progreso);
	var datos = new FormData();
	datos.append("func", accion)
	datos.append("idusuarios", idUsuarios)
	datos.append("cedula", cedula)
	datos.append("nombres", nombres)
	datos.append("telefono", telefono)
	datos.append("direccion", direccion)
	datos.append("idciudades", idciudades)
	datos.append("fecha_nac", fecha_nac)
	datos.append("user", user)
	datos.append("pass", pass)
	datos.append("acceso", idacceso)
	//datos.append("idmunicipalidades", idmunicipalidades)
	var OpAjax = $.ajax({

		data: datos,
		url: "./php/abmUsuarios.php",
		type: "post",
		cache: false,
		contentType: false,
		processData: false,
		error: function (jqXHR, textstatus, errorThrowm) {
			cerrar_esta_ventanas(id_progreso);
			ver_vetana_informativa("ERROR DE CONEXIÓN...!", id_progreso)


			return false;
		},
		success: function (responseText) {

			Respuesta = responseText;
			console.log(Respuesta);

			if (Respuesta == "camposvacio") {
				ver_vetana_informativa("FALTÓ COMPLETAR ALGUN CAMPO", id_progreso);
				return false;
			}
			if (Respuesta == "duplicado") {
				ver_vetana_informativa("DATO DUPLICADO", id_progreso);
				return false;
			}
			if (Respuesta == "in") {
				ver_vetana_informativa("DATO INCORRECTO", id_progreso);
				return false();
			}

			if (Respuesta == "exito") {

				if (accion == 'guardar') {
					ver_vetana_informativa("DATOS REGISTRADO CORRECTAMENTE", id_progreso)
					limpiar_campos_Usuarios();
					buscar_datos_Usuarios("ACTIVO");
				} 
				if (accion == 'editar') {
					ver_vetana_informativa("DATOS ACTUALIZADO CORRECTAMENTE", id_progreso)
					limpiar_campos_Usuarios();
					buscar_datos_Usuarios("ACTIVO");
				} 
				if (accion == 'eliminar') {
					ver_vetana_informativa("DATOS ELIMINADO CORRECTAMENTE", id_progreso)
					limpiar_campos_Usuarios();
					buscar_datos_Usuarios("ACTIVO");
				}

			} else {

				ver_vetana_informativa("LO SENTIMOSn OCURRIO ALGO INESPERADO!", id_progreso)
				limpiar_campos_Usuarios();
			}
		}
	});


}

function limpiar_campos_Usuarios() {	
	
	document.getElementById('inp_idUsuarios').value = ''
	document.getElementById('inp_Cedula').value = ''
	document.getElementById('inp_Nombres').value = ''
	document.getElementById('inp_Telefono').value=''
	document.getElementById('inp_Direccion').value=''
	document.getElementById('combo_idCiudades_usuarios').value=''
	document.getElementById('inp_FechaNac').value=''
	document.getElementById('inp_user').value=''
	document.getElementById('inp_pass').value=''
	document.getElementById('combo_idacceso').value=''
	document.getElementById('btn_guardar_Usuarios').innerHTML = "<p style='display:none;' id='accion_guardar_Usuarios'>guardar</p>GUARDAR";
	
}

var tipoestado_Usuarios = 'ACTIVO';
function buscar_por_opciones_Usuarios(d) {
	if (d == "1") {
		tipoestado_Usuarios = 'ACTIVO';
		buscar_datos_Usuarios(tipoestado_Usuarios);
		abrir_cerrar_ventanas_Usuarios("6");
	}
	if (d == "2") {
		tipoestado_Usuarios = 'ELIMINADO';
		buscar_datos_Usuarios(tipoestado_Usuarios);
		abrir_cerrar_ventanas_Usuarios("6");
	}

}

//busccar datos
function buscar_datos_Usuarios(buscar2) {

	var buscador = document.getElementById('inpt_buscador_Usuarios').value
	document.getElementById("cnt_listado_Usuarios").innerHTML = ""
	var datos = {
		"buscar": buscador,
		"buscar2": buscar2,
		"func": "buscar"
	};
	$.ajax({
		data: datos, url: "./php/abmUsuarios.php", type: "post", beforeSend: function () {

		}, error: function (jqXHR, textstatus, errorThrowm) {

			document.getElementById("cnt_listado_Usuarios").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("cnt_listado_Usuarios").innerHTML = ''


			if (Respuesta != "error") {
				try {
					var datos = $.parseJSON(Respuesta);
					Respuesta = datos["1"];
					var datos_buscados = Respuesta;

					document.getElementById("cnt_listado_Usuarios").innerHTML = datos_buscados
				} catch (error) {

				}

			}
		}
	});


}

/*buscar Ciudad*/
function buscarUsuarios_combo() {
	var datos = new FormData();
	datos.append("func" , "buscarcombo")
	var OpAjax = $.ajax({
		data: datos,
		url: "./php/abmCiudades.php",
		type: "post",
		cache: false,
		contentType: false,
		processData: false,
		error: function (jqXHR, textstatus, errorThrowm) {
			ver_vetana_informativa("ERROR DE CONEXIÓN...!", id_progreso)
			return false;
		},
		success: function (responseText) {

			Respuesta = responseText;
			console.log(Respuesta)
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				if (Respuesta == "exito") {

					document.getElementById('combo_idCiudades_usuarios').innerHTML = datos[2]
					document.getElementById('combo_idmunicipalidades_Ciudades').innerHTML = datos[2]

				}
				else {
					ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR...!", id_progreso)
				}
			   } catch (error) {
				ver_vetana_informativa("ERROR FATAL...!", id_progreso)
			}
		}
	});
}

/*buscar Ciudad*/
function buscarCargos_combo() {
	var datos = new FormData();
	datos.append("func" , "buscarcombo")
	var OpAjax = $.ajax({
		data: datos,
		url: "./php/abmCargos.php",
		type: "post",
		cache: false,
		contentType: false,
		processData: false,
		error: function (jqXHR, textstatus, errorThrowm) {
			ver_vetana_informativa("ERROR DE CONEXIÓN...!", id_progreso)
			return false;
		},
		success: function (responseText) {

			Respuesta = responseText;
			console.log(Respuesta)
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				if (Respuesta == "exito") {

					document.getElementById('combo_idacceso').innerHTML = datos[2]

				}
				else {
					ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR...!", id_progreso)
				}
			   } catch (error) {
				ver_vetana_informativa("ERROR FATAL...!", id_progreso)
			}
		}
	});
}

/*buscar Ciudad*/
function buscarMunicipios_combo() {
	var datos = new FormData();
	datos.append("func" , "buscarcombousuario")
	var OpAjax = $.ajax({
		data: datos,
		url: "./php/abmMunicipalidades.php",
		type: "post",
		cache: false,
		contentType: false,
		processData: false,
		error: function (jqXHR, textstatus, errorThrowm) {
			ver_vetana_informativa("ERROR DE CONEXIÓN...!", id_progreso)
			return false;
		},
		success: function (responseText) {

			Respuesta = responseText;
			console.log(Respuesta)
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				if (Respuesta == "exito") {

					document.getElementById('combo_idmunicipio').innerHTML = datos[2]

				}
				else {
					ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR...!", id_progreso)
				}
			   } catch (error) {
				ver_vetana_informativa("ERROR FATAL...!", id_progreso)
			}
		}
	});
}



function obtener_datos_Usuarios(datospr) {


	
	document.getElementById('inp_idUsuarios').value = $(datospr).children('td[id="td_idusuarios"]').html();
	document.getElementById('inp_Cedula').value = $(datospr).children('td[id="td_cedula"]').html();
	document.getElementById('inp_Nombres').value = $(datospr).children('td[id="td_nombres"]').html();
	document.getElementById('inp_Telefono').value=$(datospr).children('td[id="td_telefono"]').html();
	document.getElementById('inp_Direccion').value=$(datospr).children('td[id="td_direccion"]').html();
	document.getElementById('combo_idCiudades_usuarios').value=$(datospr).children('td[id="td_idciudades"]').html();
	document.getElementById('inp_FechaNac').value=$(datospr).children('td[id="td_fecha_nac"]').html();
	document.getElementById('inp_user').value=$(datospr).children('td[id="td_user"]').html();
	document.getElementById('inp_pass').value=$(datospr).children('td[id="td_pass"]').html();
	document.getElementById('combo_idacceso').value=$(datospr).children('td[id="td_ididaccesos"]').html();
	//document.getElementById('combo_idmunicipio').value=$(datospr).children('td[id="td_idmunicipalidades"]').html();
	document.getElementById('btn_guardar_Usuarios').innerHTML = "<p style='display:none;' id='accion_guardar_Usuarios'>editar</p>EDITAR";
	abrir_cerrar_ventanas_Usuarios("4");
	
}

/*AÑADIR O MODIFICAR NUEVO CHOFER*/

function add_datos_Choferes1(datos) {
	var f = new Date
	var id_progreso = f.getMinutes() + "_" + f.getMilliseconds() + "_mensaje";
    var usuarios_idusuarios = document.getElementById('idusuarios_datos').innerHTML;
	var cedula = document.getElementById('inp_Cedula_C').value
	var nombres = document.getElementById('inp_Nombres_C').value
	var telefono = document.getElementById('inp_Telefono_C').value
	var direccion = document.getElementById('inp_Direccion_C').value
	var idciudades = document.getElementById('combo_idCiudades_Clientes').value
    var fecha_nac = document.getElementById('inp_FechaNac_C').value
    var idchoferes = document.getElementById('inp_idChoferes_C').value
   
	var accion = 'guardar'
	if ($(datos).children('p[id="accion_guardar_Choferes"]').html() == 'guardar') {
		accion = 'guardar'
	}
	if ($(datos).children('p[id="accion_guardar_Choferes"]').html() == 'editar') {
		accion = 'editar'
	} 
	if (datos == 'eliminar'){
		accion = 'eliminar'
	}
	ver_vetana_informativa("Cargando....", id_progreso);
	var datos = new FormData();
	datos.append("func", accion)
	datos.append("usuarios_idusuarios", usuarios_idusuarios)
	datos.append("cedula", cedula)
	datos.append("nombres", nombres)
	datos.append("telefono", telefono)
	datos.append("direccion", direccion)
	datos.append("idciudades", idciudades)
	datos.append("fecha_nac", fecha_nac)
	datos.append("idchoferes", idchoferes)

	var OpAjax = $.ajax({

		data: datos,
		url: "./php/abmChoferes.php",
		type: "post",
		cache: false,
		contentType: false,
		processData: false,
		error: function (jqXHR, textstatus, errorThrowm) {
			cerrar_esta_ventanas(id_progreso);
			ver_vetana_informativa("ERROR DE CONEXIÓN...!", id_progreso)


			return false;
		},
		success: function (responseText) {

			Respuesta = responseText;
			console.log(Respuesta);

			if (Respuesta == "camposvacio") {
				ver_vetana_informativa("FALTÓ COMPLETAR ALGUN CAMPO", id_progreso);
				return false;
			}
			if (Respuesta == "duplicado") {
				ver_vetana_informativa("DATO DUPLICADO", id_progreso);
				return false;
			}
			if (Respuesta == "in") {
				ver_vetana_informativa("DATO INCORRECTO", id_progreso);
				return false();
			}

			if (Respuesta == "exito") {

				if (accion == 'guardar') {
					ver_vetana_informativa("DATOS REGISTRADO CORRECTAMENTE", id_progreso)
					limpiar_campos_Choferes();
					buscar_datos_Choferes("ACTIVO");
				} 
				if (accion == 'editar') {
					ver_vetana_informativa("DATOS ACTUALIZADO CORRECTAMENTE", id_progreso)
					limpiar_campos_Choferes();
					buscar_datos_Choferes("ACTIVO");
				} 
				if (accion == 'eliminar') {
					ver_vetana_informativa("DATOS ELIMINADO CORRECTAMENTE", id_progreso)
					limpiar_campos_Choferes();
					buscar_datos_Choferes("ACTIVO");
				}

			} else {

				ver_vetana_informativa("LO SENTIMOSn OCURRIO ALGO INESPERADO!", id_progreso)
				
			}
		}
	});
}

function limpiar_campos_Choferes() {	
	document.getElementById('inp_idChoferes_C').value = ''
	document.getElementById('inp_Cedula_C').value = ''
	document.getElementById('inp_Nombres_C').value = ''
	document.getElementById('inp_Telefono_C').value=''
	document.getElementById('inp_Direccion_C').value=''
	document.getElementById('inp_user_clientes').value=''
	document.getElementById('inp_pass_clientes').value=''
	document.getElementById('combo_idCiudades_Clientes').value=''
	document.getElementById('inp_FechaNac_C').value=''
	document.getElementById('btn_guardar_Choferes').innerHTML = "<p style='display:none;' id='accion_guardar_Choferes'>guardar</p>GUARDAR";
	
}

var tipoestado_Choferes = 'ACTIVO';
function buscar_por_opciones_Choferes(d) {
	if (d == "1") {
		tipoestado_Choferes = 'ACTIVO';
		buscar_datos_Choferes(tipoestado_Choferes);
		abrir_cerrar_ventanas_Choferes("6");
	}
	if (d == "2") {
		tipoestado_Choferes = 'ELIMINADO';
		buscar_datos_Choferes(tipoestado_Choferes);
		abrir_cerrar_ventanas_Choferes("6");
	}

}

//busccar datos
function buscar_datos_Choferes(buscar2) {

	var buscador = document.getElementById('inpt_buscador_Choferes').value
	document.getElementById("cnt_listado_Choferes").innerHTML = ""
	var datos = {
		"buscar": buscador,
		"buscar2": buscar2,
		"func": "buscar"
	};
	$.ajax({
		data: datos, url: "./php/abmChoferes.php", type: "post", beforeSend: function () {

		}, error: function (jqXHR, textstatus, errorThrowm) {

			document.getElementById("cnt_listado_Choferes").innerHTML = ''
		},
		success: function (responseText) {

			var Respuesta = responseText;
			console.log(Respuesta)
			document.getElementById("cnt_listado_Choferes").innerHTML = ''


			if (Respuesta != "error") {
				try {
					var datos = $.parseJSON(Respuesta);
					Respuesta = datos["1"];
					var datos_buscados = Respuesta;

					document.getElementById("cnt_listado_Choferes").innerHTML = datos_buscados
				} catch (error) {

				}

			}
		}
	});


}

/*buscar Ciudad*/
function buscarChoferes_combo() {
	var datos = new FormData();
	datos.append("func" , "buscarcombo")
	var OpAjax = $.ajax({
		data: datos,
		url: "./php/abmChoferes.php",
		type: "post",
		cache: false,
		contentType: false,
		processData: false,
		error: function (jqXHR, textstatus, errorThrowm) {
			ver_vetana_informativa("ERROR DE CONEXIÓN...!", id_progreso)
			return false;
		},
		success: function (responseText) {

			Respuesta = responseText;
			console.log(Respuesta)
			try {
				var datos = $.parseJSON(Respuesta);
				Respuesta = datos["1"];
				if (Respuesta == "exito") {

					document.getElementById('combo_idCiudades_Clientes').innerHTML = datos[2]

				}
				else {
					ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR...!", id_progreso)
				}
			   } catch (error) {
				ver_vetana_informativa("ERROR FATAL...!", id_progreso)
			}
		}
	});
}

function obtener_datos_Choferes(datospr) {
	document.getElementById('inp_idChoferes_C').value = $(datospr).children('td[id="td_idchoferes"]').html();
	document.getElementById('inp_Cedula_C').value = $(datospr).children('td[id="td_cedula"]').html();
	document.getElementById('inp_Nombres_C').value = $(datospr).children('td[id="td_nombres"]').html();
	document.getElementById('inp_Telefono_C').value=$(datospr).children('td[id="td_telefono"]').html();
	document.getElementById('inp_Direccion_C').value=$(datospr).children('td[id="td_direccion"]').html();
	document.getElementById('combo_idCiudades_Clientes').value=$(datospr).children('td[id="td_idciudades"]').html();
	document.getElementById('inp_FechaNac_C').value=$(datospr).children('td[id="td_fecha_nac"]').html();
	document.getElementById('btn_guardar_Choferes').innerHTML = "<p style='display:none;' id='accion_guardar_Choferes'>editar</p>EDITAR";
	abrir_cerrar_ventanas_Choferes("4");
	
}





