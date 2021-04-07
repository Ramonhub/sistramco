<?php
require("conexion.php");

function verificar_datos(){
	    $func = $_POST['func'];
		$func = utf8_decode($func );
		if($func=='buscar'){
			$buscar = $_POST['buscar'];
			$buscar = utf8_decode($buscar);
			
			
			$buscar2 = $_POST['buscar2'];
			$buscar2 = utf8_decode($buscar2);	
			buscar($buscar,$buscar2);
			
		}
		
		if($func=='buscar1'){
			$buscar = $_POST['buscar'];
			$buscar = utf8_decode($buscar);
			
			
			$buscar2 = $_POST['buscar2'];
			$buscar2 = utf8_decode($buscar2);	
			buscar_clientes_vista($buscar,$buscar2);
			
		}
		if($func=='buscarcombo'){		
			buscar_combo();	
		}
		
		if($func=='guardar' || $func=='editar' || $func=='eliminar'){
			
		$idchoferes = $_POST['idchoferes'];
		$idchoferes = utf8_decode($idchoferes);
		
		$cedula = $_POST['cedula'];
		$cedula = utf8_decode($cedula);
		
		$usuarios_idusuarios = $_POST['usuarios_idusuarios'];
		$usuarios_idusuarios = utf8_decode($usuarios_idusuarios);
		
	    $nombres = $_POST['nombres'];
		$nombres = utf8_decode($nombres);
		
	    $telefono = $_POST['telefono'];
		$telefono = utf8_decode($telefono);		
		
	    $direccion = $_POST['direccion'];
		$direccion = utf8_decode($direccion);		
		
	    $idciudades = $_POST['idciudades'];
		$idciudades = utf8_decode($idciudades);
		
		$fecha_nac = $_POST['fecha_nac'];
		$fecha_nac = utf8_decode($fecha_nac);
		
		
		mantenimiento($func,$cedula,$nombres,$telefono,$direccion,$idciudades,$fecha_nac,$usuarios_idusuarios,$idchoferes);
		}
		}	


function mantenimiento($func,$cedula,$nombres,$telefono,$direccion,$idciudades,$fecha_nac,$usuarios_idusuarios,$idchoferes){
	if($cedula=="" || $nombres=="" || $telefono=="" || $direccion=="" || $idciudades=="" || $usuarios_idusuarios==""){
    echo "camposvacio";	
    exit;
	}

$mysqli=conectar_al_servidor();
if($func=='guardar'){
$consulta= "Select count(*) from choferes where cedula=? ";
$stmt = $mysqli->prepare($consulta);
$ss='s';
$stmt->bind_param($ss, $cedula); 
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
$result = $stmt->get_result();
$nro_total=$result->fetch_row();
  $valor=$nro_total[0];

if($valor>=1)
{
echo "duplicado";	
exit;
}
   $sql="insert into choferes (cedula, nombres, telefono, direccion, idciudades, fecha_nac,usuarios_idusuarios, estado) value (upper(?),upper(?),upper(?),upper(?),upper(?),upper(?),upper(?),'ACTIVO')";
   $s='sssssss';
   $stmt = $mysqli->prepare($sql);
   echo $mysqli -> error;
   $stmt->bind_param($s,$cedula,$nombres,$telefono,$direccion,$idciudades,$fecha_nac,$usuarios_idusuarios); 
}else if($func=='editar'){
		
	    $sql='update choferes set cedula=upper(?),nombres=upper(?), telefono=upper(?), direccion=upper(?), idciudades=upper(?), fecha_nac=upper(?),usuarios_idusuarios=upper(?),estado="ACTIVO" where idchoferes=?';
		$s='sssssssi';
			$stmt = $mysqli->prepare($sql);
			
            $stmt->bind_param($s,$cedula,$nombres,$telefono,$direccion,$idciudades,$fecha_nac,$usuarios_idusuarios,$idchoferes); 
	} else if($func=='eliminar'){
		
	    $sql="update choferes set estado='ELIMINADO' where idchoferes=?";
		
		$s='i';
			$stmt = $mysqli->prepare($sql);
            $stmt->bind_param($s,$idchoferes); 
	}
   if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
	echo"exito";
}
	
	
	
function buscar($buscar,$buscar2)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $sql= "SELECT u.idchoferes,u.cedula, u.nombres, u.telefono, u.direccion, u.idciudades,c.ciudades,
u.fecha_nac,u.estado
FROM choferes u 
join ciudades c on u.idciudades=c.idciudades where u.estado=? and concat(u.cedula,' ',u.nombres) like ?"; 
   $stmt = $mysqli->prepare($sql);
  $s='ss';
$buscar="%".$buscar."%";
$buscar2="".$buscar2."";
$stmt->bind_param($s,$buscar2,$buscar);
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		    
		  	  $idchoferes=utf8_encode($valor['idchoferes']);
		  	  $cedula=utf8_encode($valor['cedula']);
			  $nombres=utf8_encode($valor['nombres']);
			  $telefono=utf8_encode($valor['telefono']);
			  $direccion=utf8_encode($valor['direccion']);
			  $idciudades=utf8_encode($valor['idciudades']);
			  $ciudades=utf8_encode($valor['ciudades']);
			  $fecha_nac=utf8_encode($valor['fecha_nac']);
			
			  $estado=utf8_encode($valor['estado']); 
	  	 
$pagina.="
<table  border='0' class='table_5' cellspacing='0' cellpadding='0'>
<tr onclick='obtener_datos_Choferes(this)'>
<td class='td_detalles' style='width:0%;display: none;' id='td_idchoferes'>".$idchoferes."</td>
<td class='td_detalles' style='width:0%;display: none;' id='td_idciudades'>".$idciudades."</td>
<td class='td_detalles' style='width:14.2%;' id='td_cedula'>".$cedula."</td>
<td class='td_detalles' style='width:14.2%;' id='td_nombres'>".$nombres."</td>
<td class='td_detalles' style='width:14.2%;' id='td_telefono'>".$telefono."</td>
<td class='td_detalles' style='width:14.2%;' id='td_direccion'>".$direccion."</td>
<td class='td_detalles' style='width:14.2%' id='td_ciudades'>".$ciudades."</td>
<td class='td_detalles' style='width:14.2%;' id='td_fecha_nac'>".$fecha_nac."</td>
<td class='td_detalles' style='width:14.2%;' id='td_estado' >".$estado."</td>
</tr>
</table>";		  
	  }
 }

  $informacion =array("1" => $pagina);
echo json_encode($informacion);	
exit;
}
	
function buscar_clientes_vista($buscar,$buscar2)
{
	$mysqli=conectar_al_servidor();
	 $pagina='';
	 $sql= "SELECT u.idchoferes,u.cedula, u.nombres, u.telefono, u.direccion, u.idciudades,c.ciudades,
u.fecha_nac,u.estado
FROM choferes u 
join ciudades c on u.idciudades=c.idciudades where u.estado=? and concat(u.cedula,' ',u.nombres) like ?"; 
   $stmt = $mysqli->prepare($sql);
  $s='ss';
$buscar="%".$buscar."%";
$buscar2="".$buscar2."";
$stmt->bind_param($s,$buscar2,$buscar);
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
 
	$result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 
 if ($valor>0)
 {
	  while ($valor= mysqli_fetch_assoc($result))
	  {
		    
		  	  $idchoferes=utf8_encode($valor['idchoferes']);
		  	  $cedula=utf8_encode($valor['cedula']);
			  $nombres=utf8_encode($valor['nombres']);
			  $telefono=utf8_encode($valor['telefono']);
			  $direccion=utf8_encode($valor['direccion']);
			  $idciudades=utf8_encode($valor['idciudades']);
			  $ciudades=utf8_encode($valor['ciudades']);
			  $fecha_nac=utf8_encode($valor['fecha_nac']);
			  $estado=utf8_encode($valor['estado']); 
	  	 
$pagina.="
<table  border='0' class='table_5' cellspacing='0' cellpadding='0'>
<tr onclick='obtener_datos_Clientes_general(this)'>
<td class='td_detalles' style='width:0%;display: none;' id='td_idchoferes'>".$idchoferes."</td>
<td class='td_detalles' style='width:0%;display: none;' id='td_idciudades'>".$idciudades."</td>
<td class='td_detalles' style='width:14.2%;' id='td_cedula'>".$cedula."</td>
<td class='td_detalles' style='width:14.2%;' id='td_nombres'>".$nombres."</td>
<td class='td_detalles' style='width:14.2%;' id='td_telefono'>".$telefono."</td>
<td class='td_detalles' style='width:14.2%;' id='td_direccion'>".$direccion."</td>
<td class='td_detalles' style='width:14.2%' id='td_ciudades'>".$ciudades."</td>
<td class='td_detalles' style='width:14.2%;' id='td_fecha_nac'>".$fecha_nac."</td>
<td class='td_detalles' style='width:14.2%;' id='td_estado' >".$estado."</td>
</tr>
</table>";		  
	  }
 }

  $informacion =array("1" => $pagina);
echo json_encode($informacion);	
exit;
}

function buscar_combo() {
	$mysqli=conectar_al_servidor();
	 $pagina='<option value ="">SELECCIONAR</option>';
	 $sql= "Select idciudades,ciudades from ciudades where estado='ACTIVO'"; 
   $stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
   }
 
 $result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 if ($valor>0) {
	  while ($valor= mysqli_fetch_assoc($result)) {  
		$idciudades=$valor['idciudades'];  
		$ciudades=utf8_encode($valor['ciudades']);
        $pagina.="<option value ='".$idciudades."'>".$ciudades."</option>";	  
	  }
 }

$informacion =array("1" => "exito","2" => $pagina);
echo json_encode($informacion);	
exit;
}



verificar_datos();
?>