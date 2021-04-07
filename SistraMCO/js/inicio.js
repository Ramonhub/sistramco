/*onload*/
 window.onload=function(){
				if (typeof history.pushState === "function") {
        history.pushState("jibberish", null, null);
        window.onpopstate = function () {
            history.pushState('newjibberish', null, null);
			
            // Handle the back (or forward) buttons here
            // Will NOT handle refresh, use onbeforeunload for this.
        };
    }
    else {
        var ignoreHashChange = true;
        window.onhashchange = function () {
            if (!ignoreHashChange) {
                ignoreHashChange = true;
                window.location.hash = Math.random();
				
                // Detect and redirect change here
                // Works in older FF and IE9
                // * it does mess with your hash symbol (anchor?) pound sign
                // delimiter on the end of the URL
            }
            else {
                ignoreHashChange = false;   
            }
          };
       }
			buscarmisdatos();
}
		
function ocultarmensaje(){
	document.getElementById('capa_informativa').innerHTML=""
	document.getElementById('capa_informativa').style.display='none'
}

function verCerrarEfectoCargando(d){
	document.getElementById("div_principal_info_carga").style.display='none'
	if(d=="1"){
	document.getElementById("div_principal_info_carga").style.display=''
	}
}

function buscarmisdatos(){
		verCerrarEfectoCargando("1")
		 	
				obtener_datos_user();
				 var datos = {
			 "useru":userid,
			 "passu":passuser,
			 "navegador": navegador,
			"funt": "buscarmisdatos"
			};
	 $.ajax({
			
			data: datos,
			url: "./php/abmusuario.php",
			type:"post",
			beforeSend: function(){			
			
			
			},
				error: function(jqXHR, textstatus, errorThrowm){
	verCerrarEfectoCargando("2")
		
			},
			success: function(responseText)
			{
	verCerrarEfectoCargando("2")
			var Respuesta=responseText;
     console.log(Respuesta)
			try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
			
		 if (Respuesta=="UI"){
			IrAlogin()
				ver_vetana_informativa("USUARIO INCORRECTO VUELVA A INICIAR SESION...",id_progreso);
						return false;
			} 
			if (Respuesta=="NI")
			{
		
			ver_vetana_informativa("NO PUEDES REALIZAR LA ACCIÓN...",id_progreso);
			
					
						return false;
					


			} 
			if (Respuesta == "exito"){	
		  document.cookie="user="+userid+";max-age=864000;path=/";
          document.cookie="pass="+passuser+";max-age=864000;path=/";	
		  var Nusuario=datos[2];
		  var Acceso=datos[3];
		  var IDusuario=datos[4];
		 document.getElementById("usuario_datos").innerHTML=Acceso+"=>"+Nusuario;
		 document.getElementById("idusuarios_datos").innerHTML=IDusuario;
		 document.getElementById("acceso_datos").innerHTML=Acceso;
	     if(Acceso=="ADMINISTRADOR"){
			
			 //MENU PROCESOS
			document.getElementById('m_procesos').style.display='';
			document.getElementById('m_planmultas').style.display='';
			document.getElementById('m_asignaratividades').style.display='';
			 //MENU MANTENIMIENTOS
			document.getElementById('m_mantenimientos').style.display='';
			document.getElementById('m_infractor').style.display='';
			document.getElementById('m_usuarios').style.display='';
			document.getElementById('m_ciudades').style.display='';
			document.getElementById('m_departamentos').style.display='';
			document.getElementById('m_regiones').style.display='';
			//document.getElementById('m_paises').style.display='';
			document.getElementById('m_cargo').style.display='';
			document.getElementById('m_marcas').style.display='';
			document.getElementById('m_categorias').style.display='';
			document.getElementById('m_tiposactividades').style.display='';
			document.getElementById('m_municipalidades').style.display='';
			
			/* document.getElementById('m_cargos').style.display=''; */
			//MENU REPORTES
	
		 }
		 
		
		 }
			}catch(error)
				{
				alert (error);
				ver_vetana_informativa("LO 1 ºSENTIMOS HA OCURRIDO UN ERROR...",id_progreso);
				}
			}
			});
	
	
}

var paginacargando="<center><br><br><img src='./icono/cargando.gif' style='width:30px' /></center>";
var userid="1";
var passuser="NDE4MQ++";
var navegador="NoDefinido"
   

function obtener_datos_user(){
	
	userid=buscar_datos_url_usuario('q');
	passuser=buscar_datos_url_usuario('p');
	navegador=obtener_navegor_en_uso();
	
	if(userid==""){
		 document.cookie="user=;max-age=86400;path=/";
               document.cookie="pass=;max-age=86400;path=/";
IrAlogin()
	}
	if(passuser==""){
			 document.cookie="user=;max-age=86400;path=/";
               document.cookie="pass=;max-age=86400;path=/";
		       IrAlogin()

	}
}

   function IrAlogin(){
	document.cookie="user=;max-age=864000;path=/";
    document.cookie="pass=;max-age=864000;path=/";
	window.location="./index.html";
}
   function obtener_datos(datos){
		
   var loc = datos;
   if (loc.indexOf('?')>0)
   {
   
   var getstring = loc.split('?')[1];
   var GET= getstring.split('&');
   var get ={};
  
   for (var i =0, l = GET.length; i < l;i++)
   {
   var tmp = GET[i].split('=');
   get[tmp[0]]= unescape(decodeURI(tmp[1]));
   
   }
   return get;
   }
	}
   function buscar_datos_url_usuario(datos){
		try{
			valores = document.location.href;
		 valores = obtener_datos(valores);
		 var  datos=valores[datos];
		 return datos;
		}catch(error){
		return "";
		} 
	}
	
 //buscar cookies
	 function buscar_este_cookie(name){
		 var nameEQ=name+"=";
		 var ca= document.cookie.split(";");
		 for(var i=0;i<ca.length;i++)
		 {
			 var c =ca[i];
			 while(c.charAt(0)==' ')c=c.substring(1,c.length);
			 if(c.indexOf(nameEQ)==0){
				 return decodeURIComponent (c.substring(nameEQ.length,c.length));
			 }
		 }
		 return null;
	 }
	 
	  /*Obtener navegador en uso*/
	 function obtener_navegor_en_uso(){
	 	var navegador =navigator.userAgent;
		var na ;
		if((na=navegador.indexOf('MSIE'))!==-1)
		{
		  navegador = "explorer";
		}else{
		if((na=navegador.indexOf('OPERA'))!==-1)
		{
		  navegador = "opera";
		}else{
		if((na=navegador.indexOf('Chrome'))!==-1)
		{
		  navegador = "chrome";
		}else{
		if((na=navegador.indexOf('Firefox'))!==-1)
		{
		  navegador = "Firefox";
		}else{
		navegador ="otros";
		}
	       }
		   }
		   }
		return navegador ;   
	 }


function cerrarSesion(){
	
	
	verCerrarEfectoCargando("1")
	  var datos = new FormData();
			obtener_datos_user();
			 datos.append("useru" , userid)
			 datos.append("passu" , passuser)
			 datos.append("navegador" , navegador)
			 datos.append("funt", "cerrarsesion")
			
		
			
			var OpAjax= $.ajax({
			
			data: datos,
			url: "./php/abmusuario.php",
			type:"post",
	        cache:false,
			contentType: false,
			processData: false,
				error: function(jqXHR, textstatus, errorThrowm){
						verCerrarEfectoCargando("")
					
ver_vetana_informativa("ERROR DE CONECCIÓN...",id_progreso);
					 return false;
			},
			success: function(responseText)
			{
			  	 verCerrarEfectoCargando("")
			Respuesta=responseText;			
				console.log(Respuesta)
		try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
		 

		 if (Respuesta=="UI")
			{
		
			IrAlogin()
			
						return false;
					


			} 
			
			
			if (Respuesta=="exito")
			{
		
				IrAlogin()
					


			}
			else
			{
			ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR...",id_progreso);
	
				

			}
			
			}catch(error)
				{
					ver_vetana_informativa("LO SENTIMOS HA OCURRIDO UN ERROR...",id_progreso);
					
				}
		 
					
			}
			});
			
	
}

	 
	 
	 
	 
	 
	 
	 
	 
	 
	
	

function controlcerrrarventana(){
	/* if($("div[id=cnt_forms]").css("display")!="none") {
        $("div[id=cnt_forms]").attr("style", "display:none");
    }
    if($("div[id=buscador_ventas_reporte_ganancia]").css("display")!="none") {
        $("div[id=buscador_ventas_reporte_ganancia]").attr("style", "display:none");
    }
	if($("div[id=abm_pagos]").css("display")!="none") {
        $("div[id=abm_pagos]").attr("style", "display:none");
    } */
    //cerrar pagos
	buscarmisdatos();

	
	//cerrar clientes
	abrir_cerrar_ventanas_Choferes("2");
	abrir_cerrar_ventanas_Choferes("4");
	//cerrar usuarios
	abrir_cerrar_ventanas_Usuarios("2");
	abrir_cerrar_ventanas_Usuarios("4");
	//cerrar ciudades
	abrir_cerrar_ventanas_Ciudades("2");
	abrir_cerrar_ventanas_Ciudades("4");
	//cerrar departamentos
	abrir_cerrar_ventanas_departamentos("2");
	abrir_cerrar_ventanas_departamentos("4");
	//cerrar regiones
	abrir_cerrar_ventanas_regiones("2");
	abrir_cerrar_ventanas_regiones("4");
	
	//cerrar accesos
	abrir_cerrar_ventanas_accesos("2");
	abrir_cerrar_ventanas_accesos("4");
	//cerrar marcas
	abrir_cerrar_ventanas_marcas("2");
	abrir_cerrar_ventanas_marcas("4");
	//cerrar categorias
	abrir_cerrar_ventanas_categorias("2");
	abrir_cerrar_ventanas_categorias("4");
		
		//cerrar tiposactividades
	abrir_cerrar_ventanas_tiposactividades("2");
	abrir_cerrar_ventanas_tiposactividades("4");
		
		//cerrar planmultas
	abrir_cerrar_ventanas_planmultas("2");
	abrir_cerrar_ventanas_planmultas("4");
		
		//cerrar municipalidades
	abrir_cerrar_ventanas_municipalidades("2");
	abrir_cerrar_ventanas_municipalidades("4");
		
		//cerrar asignaratividades
	abrir_cerrar_ventanas_asignaratividades("2");
	abrir_cerrar_ventanas_asignaratividades("4");
	
	
}


function abrir_cerrar_ventanas_asignaratividades(d){
	if(d=="1"){
	controlcerrrarventana();
		document.getElementById('abm_asignaratividades').style.display='';
		document.getElementById('cnt_forms').style.display='';
		buscarUsuarios_combo();
		buscar_datos_asignaratividades(estado_asignaratividades);
		
	} 
	if(d=="2"){
		document.getElementById('abm_asignaratividades').style.display='none';
		document.getElementById('cnt_forms').style.display='none';
	}
	if(d=="3"){
		document.getElementById('buscador_asignaratividades').style.display='';
		
	} 
	
	if(d=="5"){
		document.getElementById('opciones_asignaratividades').style.display='';
	} 
	if(d=="6"){
		document.getElementById('opciones_asignaratividades').style.display='none';
	}
	if(d=="7"){
		var idasignaratividades=document.getElementById('inp_idasignaratividades').value
		if(idasignaratividades==""){
			ver_vetana_informativa("FALTA SELECCIONAR EL DATO",id_progreso);
			return;
		}
		ver_vetana_eliminar("¿DESEAS ELIMINAR ESTE DATO?",id_progreso,"15");
	} 
}


function abrir_cerrar_ventanas_municipalidades(d){
	if(d=="1"){
	controlcerrrarventana();
		document.getElementById('abm_municipalidades').style.display='';
		document.getElementById('cnt_forms').style.display='';
		buscarUsuarios_combo();
		buscar_datos_municipalidades(estado_municipalidades);
		
	} 
	if(d=="2"){
		document.getElementById('abm_municipalidades').style.display='none';
		document.getElementById('cnt_forms').style.display='none';
	}
	if(d=="3"){
		document.getElementById('buscador_municipalidades').style.display='';
		
	} 
	
	if(d=="5"){
		document.getElementById('opciones_municipalidades').style.display='';
	} 
	if(d=="6"){
		document.getElementById('opciones_municipalidades').style.display='none';
	}
	if(d=="7"){
		var idmunicipalidades=document.getElementById('inp_idmunicipalidades').value
		if(idmunicipalidades==""){
			ver_vetana_informativa("FALTA SELECCIONAR EL DATO",id_progreso);
			return;
		}
		ver_vetana_eliminar("¿DESEAS ELIMINAR ESTE DATO?",id_progreso,"14");
	} 
}



function abrir_cerrar_ventanas_planmultas(d){
	if(d=="1"){
	controlcerrrarventana();
		document.getElementById('abm_planmultas').style.display='';
		document.getElementById('cnt_forms').style.display='';
		buscar_datos_planmultas(estado_planmultas);
		
	} 
	if(d=="2"){
		document.getElementById('abm_planmultas').style.display='none';
		document.getElementById('cnt_forms').style.display='none';
	}
	if(d=="3"){
		document.getElementById('buscador_planmultas').style.display='';
		
	} 
	
	if(d=="5"){
		document.getElementById('opciones_planmultas').style.display='';
	} 
	if(d=="6"){
		document.getElementById('opciones_planmultas').style.display='none';
	}
	if(d=="7"){
		var idplanmultas=document.getElementById('inp_idplanmultas').value
		if(idplanmultas==""){
			ver_vetana_informativa("FALTA SELECCIONAR EL DATO",id_progreso);
			return;
		}
		ver_vetana_eliminar("¿DESEAS ELIMINAR ESTE DATO?",id_progreso,"13");
	} 
}


function abrir_cerrar_ventanas_tiposactividades(d){
	if(d=="1"){
	controlcerrrarventana();
		document.getElementById('abm_tiposactividades').style.display='';
		document.getElementById('cnt_forms').style.display='';
		buscar_datos_tiposactividades(estado_tiposactividades);
		
	} 
	if(d=="2"){
		document.getElementById('abm_tiposactividades').style.display='none';
		document.getElementById('cnt_forms').style.display='none';
	}
	if(d=="3"){
		document.getElementById('buscador_tiposactividades').style.display='';
		
	} 
	
	if(d=="5"){
		document.getElementById('opciones_tiposactividades').style.display='';
	} 
	if(d=="6"){
		document.getElementById('opciones_tiposactividades').style.display='none';
	}
	if(d=="7"){
		var idtiposactividades=document.getElementById('inp_idtiposactividades').value
		if(idtiposactividades==""){
			ver_vetana_informativa("FALTA SELECCIONAR EL DATO",id_progreso);
			return;
		}
		ver_vetana_eliminar("¿DESEAS ELIMINAR ESTE DATO?",id_progreso,"12");
	} 
}



function abrir_cerrar_ventanas_categorias(d){
	if(d=="1"){
	controlcerrrarventana();
		document.getElementById('abm_categorias').style.display='';
		document.getElementById('cnt_forms').style.display='';
		buscar_datos_categorias(estado_categorias);
		
	} 
	if(d=="2"){
		document.getElementById('abm_categorias').style.display='none';
		document.getElementById('cnt_forms').style.display='none';
	}
	if(d=="3"){
		document.getElementById('buscador_categorias').style.display='';
		
	} 
	
	if(d=="5"){
		document.getElementById('opciones_categorias').style.display='';
	} 
	if(d=="6"){
		document.getElementById('opciones_categorias').style.display='none';
	}
	if(d=="7"){
		var idcategorias=document.getElementById('inp_idcategorias').value
		if(idcategorias==""){
			ver_vetana_informativa("FALTA SELECCIONAR EL DATO",id_progreso);
			return;
		}
		ver_vetana_eliminar("¿DESEAS ELIMINAR ESTE DATO?",id_progreso,"11");
	} 
}



function abrir_cerrar_ventanas_marcas(d){
	if(d=="1"){
	controlcerrrarventana();
		document.getElementById('abm_marcas').style.display='';
		document.getElementById('cnt_forms').style.display='';
		buscar_datos_marcas(estado_marcas);
		
	} 
	if(d=="2"){
		document.getElementById('abm_marcas').style.display='none';
		document.getElementById('cnt_forms').style.display='none';
	}
	if(d=="3"){
		document.getElementById('buscador_marcas').style.display='';
		
	} 
	
	if(d=="5"){
		document.getElementById('opciones_marcas').style.display='';
	} 
	if(d=="6"){
		document.getElementById('opciones_marcas').style.display='none';
	}
	if(d=="7"){
		var idmarcas=document.getElementById('inp_idmarcas').value
		if(idmarcas==""){
			ver_vetana_informativa("FALTA SELECCIONAR EL DATO",id_progreso);
			return;
		}
		ver_vetana_eliminar("¿DESEAS ELIMINAR ESTE DATO?",id_progreso,"10");
	} 
}



function abrir_cerrar_ventanas_accesos(d){
	if(d=="1"){
	controlcerrrarventana();
		document.getElementById('abm_accesos').style.display='';
		document.getElementById('cnt_forms').style.display='';
		buscar_datos_accesos(estado_accesos);
		
	} 
	if(d=="2"){
		document.getElementById('abm_accesos').style.display='none';
		document.getElementById('cnt_forms').style.display='none';
	}
	if(d=="3"){
		document.getElementById('buscador_accesos').style.display='';
		
	} 
	
	if(d=="5"){
		document.getElementById('opciones_accesos').style.display='';
	} 
	if(d=="6"){
		document.getElementById('opciones_accesos').style.display='none';
	}
	if(d=="7"){
		var idaccesos=document.getElementById('inp_idaccesos').value
		if(idaccesos==""){
			ver_vetana_informativa("FALTA SELECCIONAR EL DATO",id_progreso);
			return;
		}
		ver_vetana_eliminar("¿DESEAS ELIMINAR ESTE DATO?",id_progreso,"9");
	} 
}






function abrir_cerrar_ventanas_Choferes(d){
	if(d=="1"){
		  controlcerrrarventana();
		document.getElementById('abm_Choferes').style.display='';
		document.getElementById('cnt_forms').style.display='';
		buscarChoferes_combo();
	} 
	if(d=="2"){
		document.getElementById('abm_Choferes').style.display='none';
		document.getElementById('cnt_forms').style.display='none';
	}
	if(d=="3"){
		document.getElementById('buscador_Choferes').style.display='';
		buscar_datos_Choferes(tipoestado_Choferes);
	} 
	if(d=="4"){
		document.getElementById('buscador_Choferes').style.display='none';
	}
	if(d=="5"){
		document.getElementById('opciones_Choferes').style.display='';
	} 
	if(d=="6"){
		document.getElementById('opciones_Choferes').style.display='none';
	}
	if(d=="7"){
		var idClientes=document.getElementById('inp_idChoferes_C').value
		if(idClientes==""){
			ver_vetana_informativa("FALTA SELECCIONAR EL DATO",id_progreso);
			return;
		}
		ver_vetana_eliminar("¿DESEAS ELIMINAR ESTE DATO?",id_progreso,"8");
	} 
}

function abrir_cerrar_ventanas_Usuarios(d){
	if(d=="1"){
		controlcerrrarventana();
		document.getElementById('abm_Usuarios').style.display='';
		document.getElementById('cnt_forms').style.display='';
		buscarUsuarios_combo();
		buscarCargos_combo();
		buscar_datos_Usuarios(tipoestado_Usuarios);
		 //buscarMunicipios_combo();
	} 
	if(d=="2"){
		document.getElementById('abm_Usuarios').style.display='none';
		document.getElementById('cnt_forms').style.display='none';
	}
	if(d=="3"){
		document.getElementById('buscador_Usuarios').style.display='';
		buscar_datos_Usuarios(tipoestado_Usuarios);
	} 
	if(d=="4"){
		document.getElementById('buscador_Usuarios').style.display='none';
	}
	if(d=="5"){
		document.getElementById('opciones_Usuarios').style.display='';
	} 
	if(d=="6"){
		document.getElementById('opciones_Usuarios').style.display='none';
	}
	if(d=="7"){
		var idUsuarios=document.getElementById('inp_idUsuarios').value
		if(idUsuarios==""){
			ver_vetana_informativa("FALTA SELECCIONAR EL DATO",id_progreso);
			return;
		}
		ver_vetana_eliminar("¿DESEAS ELIMINAR ESTE DATO?",id_progreso,"7");
	} 
}


function abrir_cerrar_ventanas_Ciudades(d){
	if(d=="1"){
		controlcerrrarventana();
		document.getElementById('abm_Ciudades').style.display='';
		document.getElementById('cnt_forms').style.display='';
		buscarCiudades_combo();
	} 
	if(d=="2"){
		document.getElementById('abm_Ciudades').style.display='none';
		document.getElementById('cnt_forms').style.display='none';
	}
	if(d=="3"){
		document.getElementById('buscador_Ciudades').style.display='';
		buscar_datos_Ciudades(tipoestado_departamento);
	} 
	if(d=="4"){
		document.getElementById('buscador_Ciudades').style.display='none';
	}
	if(d=="5"){
		document.getElementById('opciones_Ciudades').style.display='';
	} 
	if(d=="6"){
		document.getElementById('opciones_Ciudades').style.display='none';
	}
	if(d=="7"){
		var idCiudades=document.getElementById('inp_idCiudades').value
		if(idCiudades==""){
			ver_vetana_informativa("FALTA SELECCIONAR EL DATO",id_progreso);
			return;
		}
		ver_vetana_eliminar("¿DESEAS ELIMINAR ESTE DATO?",id_progreso,"3");
	} 
}

function abrir_cerrar_ventanas_departamentos(d){
	if(d=="1"){
		controlcerrrarventana();
		document.getElementById('abm_departamentos').style.display='';
		document.getElementById('cnt_forms').style.display='';
		buscarDepartametos_combo();
	} 
	if(d=="2"){
		document.getElementById('abm_departamentos').style.display='none';
		document.getElementById('cnt_forms').style.display='none';
	}
	if(d=="3"){
		document.getElementById('buscador_departamentos').style.display='';
		buscar_datos_departamentos(tipoestado_departamento);
	} 
	if(d=="4"){
		document.getElementById('buscador_departamentos').style.display='none';
	}
	if(d=="5"){
		document.getElementById('opciones_departamentos').style.display='';
	} 
	if(d=="6"){
		document.getElementById('opciones_departamentos').style.display='none';
	}
	if(d=="7"){
		var iddepartamentos=document.getElementById('inp_iddepartamentos').value
		if(iddepartamentos==""){
			ver_vetana_informativa("FALTA SELECCIONAR EL DATO",id_progreso);
			return;
		}
		ver_vetana_eliminar("¿DESEAS ELIMINAR ESTE DATO?",id_progreso,"2");
	} 
}

function abrir_cerrar_ventanas_regiones(d){
	if(d=="1"){
	controlcerrrarventana();
		document.getElementById('abm_regiones').style.display='';
		document.getElementById('cnt_forms').style.display='';
		
		
	} 
	if(d=="2"){
		document.getElementById('abm_regiones').style.display='none';
		document.getElementById('cnt_forms').style.display='none';
	}
	if(d=="3"){
		document.getElementById('buscador_regiones').style.display='';
		buscar_datos_regiones(tipoestado);
	} 
	if(d=="4"){
		document.getElementById('buscador_regiones').style.display='none';
	}
	if(d=="5"){
		document.getElementById('opciones_regiones').style.display='';
	} 
	if(d=="6"){
		document.getElementById('opciones_regiones').style.display='none';
	}
	if(d=="7"){
		var idregiones=document.getElementById('inp_idregiones').value
		if(idregiones==""){
			ver_vetana_informativa("FALTA SELECCIONAR EL DATO",id_progreso);
			return;
		}
		ver_vetana_eliminar("¿DESEAS ELIMINAR ESTE DATO?",id_progreso,"1");
	} 
}




function abrir_cerrar_opciones_login(d,opcion){
	if(d=="1"){
		document.getElementById('opciones_login').style.display='';
	} 
	if(d=="2"){
		if(opcion=="1"){
			//cerrar sesion
          cerrarSesion();
		}
		if(opcion=="2"){
         //abrir opcion ESCANEO QR
		 
		}
		document.getElementById('opciones_login').style.display='none';
    }
}



	/*EMERGENTE ELIMINAR ACCION */
function eliminar_de_la_lista(c){
	if(c=="0"){
		var elememnto_eliminar=$("div[id=btn_eliminar_1]").children('p[id="accion_eliminar"]').html();
		add_datos_paises(elememnto_eliminar);
		
	}
	if(c=="1"){
		var elememnto_eliminar=$("div[id=btn_eliminar_1]").children('p[id="accion_eliminar"]').html();
		add_datos_regiones(elememnto_eliminar);
		
	} 
	if(c=="2"){
	var elememnto_eliminar=$("div[id=btn_eliminar_1]").children('p[id="accion_eliminar"]').html();
		add_datos_departamentos(elememnto_eliminar);
		
	} 
	
	if(c=="3"){
	var elememnto_eliminar=$("div[id=btn_eliminar_1]").children('p[id="accion_eliminar"]').html();
		add_datos_Ciudades(elememnto_eliminar);
	} 
	if(c=="4"){
	var elememnto_eliminar=$("div[id=btn_eliminar_1]").children('p[id="accion_eliminar"]').html();
		add_datos_Barrios(elememnto_eliminar);
	} 
	if(c=="5"){
	var elememnto_eliminar=$("div[id=btn_eliminar_1]").children('p[id="accion_eliminar"]').html();
		add_datos_Tipos_Lotes(elememnto_eliminar);
	} 
	if(c=="6"){
	var elememnto_eliminar=$("div[id=btn_eliminar_1]").children('p[id="accion_eliminar"]').html();
		add_datos_Lotes(elememnto_eliminar);
	}
if(c=="7"){
	var elememnto_eliminar=$("div[id=btn_eliminar_1]").children('p[id="accion_eliminar"]').html();
		add_datos_Usuarios(elememnto_eliminar);
	}
if(c=="8"){
	var elememnto_eliminar=$("div[id=btn_eliminar_1]").children('p[id="accion_eliminar"]').html();
		add_datos_Choferes1(elememnto_eliminar);
	}
if(c=="9"){
	var elememnto_eliminar=$("div[id=btn_eliminar_1]").children('p[id="accion_eliminar"]').html();
		add_datos_accesos(elememnto_eliminar);
	}
if(c=="10"){
	var elememnto_eliminar=$("div[id=btn_eliminar_1]").children('p[id="accion_eliminar"]').html();
		add_datos_marcas(elememnto_eliminar);
	}
	
if(c=="11"){
	var elememnto_eliminar=$("div[id=btn_eliminar_1]").children('p[id="accion_eliminar"]').html();
		add_datos_categorias(elememnto_eliminar);
	}
if(c=="12"){
	var elememnto_eliminar=$("div[id=btn_eliminar_1]").children('p[id="accion_eliminar"]').html();
		add_datos_tiposactividades(elememnto_eliminar);
	}
if(c=="13"){
	var elememnto_eliminar=$("div[id=btn_eliminar_1]").children('p[id="accion_eliminar"]').html();
		add_datos_planmultas(elememnto_eliminar);
	}
	if(c=="14"){
	var elememnto_eliminar=$("div[id=btn_eliminar_1]").children('p[id="accion_eliminar"]').html();
		add_datos_municipalidades(elememnto_eliminar);
	}
	
		if(c=="15"){
	var elememnto_eliminar=$("div[id=btn_eliminar_1]").children('p[id="accion_eliminar"]').html();
		add_datos_asignaratividades(elememnto_eliminar);
	}
	
	

}


function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
}

function b64_to_utf8( str ) {
  return decodeURIComponent(escape(window.atob( str )));
}

	 var id_progreso="_mensaje";
function cerrar_esta_ventanas(datos){
	$(datos).remove();
	var control='off'
		 $("div[name=ventanas_infos]").each(function(i, historial_publicacion){		
		 control='on'
		});
		if(control=='off') {
			document.getElementById('capa_informativa').style.display='none'
			document.getElementById('capa_informativa').innerHTML="";
		}
}

function ver_vetana_informativa(titulo,id_c){
	
		var pagina_informativa="<center>\
		<div class='cont_emergente_alert_largo'>\
		<div id='barra_de_progreso_"+id_c+"' name='tarea_en_progreso' class='cont_emergente_alert' >\
		<div class='table_emergente_alert' id='"+id_c+"' onclick='cerrar_esta_ventanas(this)' >\
		\
		<div style=' width:90%; margin-left: auto; margin-right: auto;'>\
        <div class='tit_submenu1' style='padding-left:0px;background-color:transparent'>\
        <label   class='input_TEXT'>INFORMACION<label/>\
        </div>\
        </div>\
		\
		<div style=' width:90%; margin-left: auto; margin-right: auto;'>\
        <div class='tit_submenu1' style='padding-left:0px;background-color:transparent'>\
        <input id='titulo_"+id_c+"' type='button' class='input_progress'   value='"+titulo+"' /></div></div><div style=' width:90%; margin-left: auto; margin-right: auto;margin-top: 1%;'>\
        <div class='input_ok' value=''style='float:right;height:30px;width:35px;' onclick='cerrar_esta_ventanas(this)' id='btn_guardar_regiones'>OK</div>\
         </div>\
         \
        </div>\
        </div>\
		</div>\
		</center>"
			
	
	document.getElementById('capa_informativa').innerHTML=pagina_informativa
	document.getElementById('capa_informativa').style.display=''
}

function ver_vetana_eliminar(titulo,id_c,b){
	
		var pagina_informativa="<center>"+
		"<div class='cont_emergente_alert_largo'>"+
		"<div id='barra_de_progreso_"+id_c+"' name='tarea_en_progreso' class='cont_emergente_alert' >"+
		"<div class='table_emergente_alert' id='"+id_c+"' onclick='cerrar_esta_ventanas(this)' >"+
		"<div style=' width:90%; margin-left: auto; margin-right: auto;'>"+
        "<div class='tit_submenu1' style='padding-left:0px;background-color:transparent'>"+
        "<label   class='input_TEXT'>OPCION<label/>"+
        "</div>"+
        "</div>"+
		"<div style=' width:90%; margin-left: auto; margin-right: auto;'>"+
        "<div class='tit_submenu1' style='padding-left:0px;background-color:transparent'>"+
        "<input id='titulo_"+id_c+"' type='button' class='input_progress'   value='"+titulo+"' />"+
		"</div>"+
		"</div>"+
		"<div style=' width:90%; margin-left: auto; margin-right: auto;margin-top: 1%;'>"+
		"<div class='input_ok'  style='float:right;height:30px;width:35px;' onclick='eliminar_de_la_lista("+b+");' id='btn_eliminar_1'><p style='display:none;' id='accion_eliminar'>eliminar</p>OK</div>"+
		"<div class='input_cancel' style='float:right;height:30px;width:75px;' onclick='cerrar_esta_ventanas(this)'>CANCELAR</div>"+
		 "</div>"+
        "</div>"+
        "</div>"+
		"</div>"+
		"</center>";
			
	
	document.getElementById('capa_informativa').innerHTML=pagina_informativa
	document.getElementById('capa_informativa').style.display=''
}

var controlinputfile="";
function exploradorImagen(datos){
	$("input[name=file_1]").click();
	controlinputfile=datos;
}

var foto="";
var ext="";

var foto1="";
var ext1="";

var foto2="";
var ext2="";

var foto3="";
var ext3="";

var foto4="";
var ext4="";

var foto5="";
var ext5="";


function readFile(input){
	var file=$("input[name="+input.name+"]")[0].files[0];
	var filename=file.name;
	var tamanho=file.size;
	if(tamanho>9000000){
		ver_vetana_informativa("LA FOTO NO PUEDE EXCEDER LOS 5MB",id_progreso);
		return false;
	}
	file_extencion=filename.substring(filename.lastIndexOf('.')+1).toLowerCase();
	if(file_extencion=="jpeg" || file_extencion=="jpg"){
		
	}else{
		ver_vetana_informativa("FORMATO DE FOTO INVALIDO SOLO ADMITE JPEG/JPG",id_progreso);
		return false;
	}
	var reader=new FileReader();
	reader.onload=function(e){
	
	if(controlinputfile=="1"){
		ext=file_extencion;
	    foto=e.target.result;
		$("div[id=cont_photo1]").css({"background-image":"url("+foto+")"})
	}
	if(controlinputfile=="2"){
		ext1=file_extencion;
	    foto1=e.target.result;
		$("div[id=cont_photo2]").css({"background-image":"url("+foto1+")"})
	}
	if(controlinputfile=="3"){
		ext2=file_extencion;
	    foto2=e.target.result;
		$("div[id=cont_photo3]").css({"background-image":"url("+foto2+")"})
	}
	if(controlinputfile=="4"){
		ext3=file_extencion;
	    foto3=e.target.result;
		$("div[id=cont_photo4]").css({"background-image":"url("+foto3+")"})
	}
	if(controlinputfile=="5"){
		ext4=file_extencion;
	    foto4=e.target.result;
		$("div[id=cont_photo5]").css({"background-image":"url("+foto4+")"})
	}
	if(controlinputfile=="6"){
		ext5=file_extencion;
	    foto5=e.target.result;
		$("div[id=cont_photo6]").css({"background-image":"url("+foto5+")"})
	}
	//document.getElementById('cont_photo').style.backgroundImage =e.target.result;
	}
	reader.readAsDataURL(input.files[0]);
}
