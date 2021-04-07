<?php

function conectar_al_servidor(){
/*SERVIDOR,NOMBRE USUARIO,CONTRASEÑA USUARIO,NOMBRE DE LA BASE DE DATOS*/	
  $mysqli = new mysqli('https://remotemysql.com/','lgDby1Uxq3','kFE6k0G2d6','lgDby1Uxq3', 3306);  
  // $mysqli = new mysqli('localhost','root','','dbsistramco');  
return  $mysqli;
}



?>