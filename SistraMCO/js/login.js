
 window.onload=function(){
			if (typeof history.pushState === "function") {
        history.pushState("jibberish", null, null);
        window.onpopstate = function () {
            history.pushState('newjibberish', null, null);
				evento_atras();
			//volver_atras_pagina()
            // Handle the back (or forward) buttons here
            // Will NOT handle refresh, use onbeforeunload for this.
        };
    }  else {
        var ignoreHashChange = true;
        window.onhashchange = function () {
            if (!ignoreHashChange) {
                ignoreHashChange = true;
                window.location.hash = Math.random();
				//evento_atras();
				//volver_atras_pagina()
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
	
	 accedercookies()
	
}


function accedercookies(){
	ver_cerrar_ventana_cargando("1")
		 	
				obtener_datos_user();
				
			
	if(userid==""){
			ver_cerrar_ventana_cargando("2")
		return
	}
	if(passuser==""){
			ver_cerrar_ventana_cargando("2")
			return

	}
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
	ver_cerrar_ventana_cargando("2")
		
			},
			success: function(responseText)
			{

			var Respuesta=responseText;
     console.log(Respuesta)
			try{
				var datos = $.parseJSON(Respuesta); 
          Respuesta=datos["1"];  
			
		 if (Respuesta=="UI")
			{
		
				ver_cerrar_ventana_cargando("2")

			} 
			if (Respuesta == "exito"){
				
				
		document.cookie="user="+userid+";max-age=864000;path=/";
        document.cookie="pass="+passuser+";max-age=864000;path=/";	
		window.location="./inicio.html?p="+passuser+"&q="+userid;

	  
			}
			}catch(error)
				{
					
				}
			}
			});
	
			
}

	
/*
INGRESAR AL SISTEMA	
*/

function verificardatos(){
	var user=document.getElementById('inpt_user').value
	var pass=document.getElementById('inpt_pass').value
	 if(user==""){
	  ver_vetana_informativa("FALTA INGRESAR EL USUARIO","#")
	  return false;
  }
  if(pass==""){
	  ver_vetana_informativa("FALTA INGRESAR LA CONTRASEÑA","#")
	  return false;
	  
  }
	entrar_al_sistema(user,pass);
}

function entrar_al_sistema(datos1,datos2){
	
	ver_cerrar_ventana_cargando(1);
	var navegador=obtener_navegor_en_uso()
	 var datos = new FormData();
			
			 datos.append("user" , datos1)
			 datos.append("pass" , datos2)
			 datos.append("navegador" , navegador)
			var OpAjax= $.ajax({
			
			data: datos,
			url: "./php/login.php",
			type:"post",
	        cache:false,
			contentType: false,
			processData: false,
				error: function(jqXHR, textstatus, errorThrowm){
					 ver_vetana_informativa("ERROR DE CONECCIÓN","#")
	ver_cerrar_ventana_cargando(2);
					 return false;
			},
			success: function(responseText)
			{
			  	 	
			Respuesta=responseText;	
			
				console.log(Respuesta)
	
		 if (Respuesta=="UI")
			{
		
			ver_cerrar_ventana_cargando(2);
				ver_vetana_informativa("USUARIO O CONTRASEÑA INCORRECTA...","#")
						return false;
					


			}
			
			if (Respuesta!="error")
			{
		
		var datos = $.parseJSON(Respuesta); 
         var p=datos["1"];  
         var u=datos["2"];  
		 document.cookie="user="+u+";max-age=864000;path=/";
          document.cookie="pass="+p+";max-age=864000;path=/";	
 window.location="./inicio.html?p="+p+"&q="+u;
				
         document.getElementById('inpt_user').value=""
	     document.getElementById('inpt_pass').value=""
					
					
					


			}
			else
			{
			ver_cerrar_ventana_cargando(2);
	
					 ver_vetana_informativa("LO SENTIMOS, HA OCURRIDO UN ERROR","#")


			}
			
			
		 
					
			}
			});
			
	
	
}

var paginacargando="<center><br><br><img src='./icono/cargando.gif' style='width:30px' /></center>";
var userid="1";
var passuser="NDE4MQ++";
var navegador="NoDefinido"
function obtener_datos_user(){
	 userid=buscar_este_cookie('user');
	 passuser=buscar_este_cookie('pass');
	navegador=obtener_navegor_en_uso();
	
}



function obtener_datos(datos){
   var loc = datos;
   if (loc.indexOf('?')>0){
   
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
	 function buscar_este_cookie(name)
	 {
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
	 function obtener_navegor_en_uso()
	 {
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
	
	
	 var imgCargandoA="<img src='./icono/cargando.gif' style='width:30px' />"
	 function ver_cerrar_ventana_cargando(d){
	 if(d=="1"){
		document.getElementById('div_cargando-info').innerHTML=imgCargandoA
		document.getElementById('lbltitulomensaje_b').innerHTML="CARGANDO..."
		document.getElementById('div_principal_info_carga').style.display=''
	}else{
		document.getElementById('div_principal_info_carga').style.display='none'
	}
    }
	
function ver_vetana_informativa(titulo,id_c){
	var pagina_informativa="<div class='div_info_3' title='click para cerrar' onclick='cerrar_ventanas(this)' id='"+id_c+"' name='ventanas_infos'>"+
	"<table style='width:100%;height:100%;padding:15px'>"+
	"<tr>"+
	"<td >"+
	"<label class='label_info_a'>"+titulo+"</label>"+
	"</td>"+
	"</tr>"+
	"</table>"+
	"</div>"
	document.getElementById('capa_informativa').innerHTML=pagina_informativa
	document.getElementById('capa_informativa').style.display=''
	 $("div[id=capa_informativa]").fadeOut(1500)
}

function ocultarmensaje(){

	document.getElementById('capa_informativa').innerHTML=""
	document.getElementById('capa_informativa').style.display='none'
}
function cerrar_ventanas(){

	document.getElementById('capa_informativa').innerHTML=""
	document.getElementById('capa_informativa').style.display='none'
}

 
	 
	 
