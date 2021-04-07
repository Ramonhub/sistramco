<?php
include('control_de_variables.php');
$funt = $_POST['funt'];
$funt = preparar_variables(utf8_decode($funt));

//cargar achivos importantes
require("conexion.php");
include("verificar_navegador.php");
function verificar($funt){
	$user=$_POST['useru'];
    $user = utf8_decode($user);
	$pass=$_POST['passu'];
	
	  $pass = str_replace("=","+",$pass);
$navegador=$_POST['navegador'];
$navegador = utf8_decode($navegador);
$resp=verificar_navegador($user,$navegador,$pass);
if($resp!="ok"){
 $informacion =array("1" => "UI");
echo json_encode($informacion);	
exit;
}

if($funt=="cerrarsesion"){
	
	cerrarSesion($user);

}

	if($funt=="buscarmisdatos"){
	buscarmisdatos($user);
}

if($funt=="addtoken"){

$token=$_POST['token'];
$token = utf8_decode($token);
$dispositivo=$_POST['dispositivo'];
$dispositivo = utf8_decode($dispositivo);
 addtoken($token,$dispositivo);
}

}


function cerrarSesion($usuario){
	$mysqli=conectar_al_servidor();
	$consulta="DELETE FROM seguridad where id_usuario=?";
  $stmt = $mysqli->prepare($consulta);

$ss='s';

$stmt->bind_param($ss,$usuario); 
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
  $informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;

}



function addtoken($token,$dispositivo)
{
	
if($token==""){
	  $informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
}
 $tokeActual=buscarToken($dispositivo);
 if($tokeActual==$token){
	  $informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;
 }
	$mysqli=conectar_al_servidor();
	$consulta="DELETE FROM token where dispositivo='$dispositivo'";
 
  $stmt = $mysqli->prepare($consulta);


if ( ! $stmt->execute()) {
 echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}		
	$consulta="Insert into token (token,dispositivo) values('$token','$dispositivo')";	

	$stmt = $mysqli->prepare($consulta);

	
if ( ! $stmt->execute()) {
  echo trigger_error('The query execution failed; MySQL said ('.$stmt->errno.') '.$stmt->error, E_USER_ERROR);
exit;
}

  $informacion =array("1" => "exito");
echo json_encode($informacion);	
exit;	
	
	
}






function buscarmisdatos($codusario)
{
// 	$mysqli=conectar_al_servidor();
// 	 $nombreapellido='';
// 		$sql= "Select u.user, u.pass, u.estado, u.idusuarios, u.nombres, u.accesos_idaccesos,a.accesos as acceso from usuarios u join accesos a on u.accesos_idaccesos=a.idaccesos where idusuarios='$codusario' ";
//    $stmt = $mysqli->prepare($sql);
 
   $mysqli=conectar_al_servidor();
	 $nombreapellido='';
		$sql= "Select * from usuarios where idusuarios='$codusario' ";
   $stmt = $mysqli->prepare($sql);


if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
 $result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 if ($valor>0){
	  while ($valor= mysqli_fetch_assoc($result)) {  
		      $idusuarios=$valor['idusuarios'];
		  	  $nombreapellido=utf8_encode($valor['nombres']);
			  $user=utf8_encode($valor['user']);
			  $pass=utf8_encode($valor['pass']);
			  $nivelacceso=utf8_encode($valor['acceso']);
			  $estado=utf8_encode($valor['estado']);  	  
	  }
 }

  $informacion =array("1"=>"exito","2" => $nombreapellido,"3" => $nivelacceso,"4" => $idusuarios);
echo json_encode($informacion);	
exit;


}

verificar($funt);
?>