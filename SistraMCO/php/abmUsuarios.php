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
		if($func=='buscarcombo'){		
			buscar_combo();	
		}
		if($func=='buscarcombousuario'){		
			buscar_combo_usuarios();	
		}
		
		if($func=='guardar' || $func=='editar' || $func=='eliminar'){
		$user = $_POST['user'];
		$user = utf8_decode($user);
		
		$pass = $_POST['pass'];
		$pass = utf8_decode($pass);
					
		$idusuarios = $_POST['idusuarios'];
		$idusuarios = utf8_decode($idusuarios);
		
		$acceso = $_POST['acceso'];
		$acceso = utf8_decode($acceso);
		
		$cedula = $_POST['cedula'];
		$cedula = utf8_decode($cedula);
		
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
		
		mantenimiento($func,$user,$pass,$acceso,$cedula,$nombres,$telefono,$direccion,$idciudades,$fecha_nac,$idusuarios);
		}
		}	


function mantenimiento($func,$user,$pass,$acceso,$cedula,$nombres,$telefono,$direccion,$idciudades,$fecha_nac,$idusuarios){
	if($user=="" || $pass=="" || $acceso=="" || $cedula=="" || $nombres=="" || $telefono=="" || $direccion=="" || $idciudades==""){
    echo "camposvacio";	
    exit;
	}

$mysqli=conectar_al_servidor();
if($func=='guardar'){
$consulta= "Select count(*) from usuarios where idusuarios=?  ";
$stmt = $mysqli->prepare($consulta);
$ss='s';
$stmt->bind_param($ss, $idusuarios); 
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
   $sql="insert into usuarios (user, pass, acceso, cedula, nombres, telefono, direccion, idciudades, fecha_nac, estado) value (upper(?),upper(?),upper(?),upper(?),upper(?),upper(?),upper(?),upper(?),upper(?),'ACTIVO')";
   $s='sssssssss';
   $stmt = $mysqli->prepare($sql);
   $stmt->bind_param($s,$user,$pass,$acceso,$cedula,$nombres,$telefono,$direccion,$idciudades,$fecha_nac); 
}else if($func=='editar'){
		
	    $sql='update usuarios set user=upper(?), pass=upper(?), acceso=upper(?), cedula=upper(?), nombres=upper(?), telefono=upper(?), direccion=upper(?), idciudades=upper(?), fecha_nac=upper(?),estado="ACTIVO" where idusuarios=?';
		$s='sssssssssi';
			$stmt = $mysqli->prepare($sql);
            $stmt->bind_param($s,$user,$pass,$acceso,$cedula,$nombres,$telefono,$direccion,$idciudades,$fecha_nac,$idusuarios); 
	} else if($func=='eliminar'){
		
	    $sql="update usuarios set estado='ELIMINADO' where idusuarios=?";
		
		$s='i';
			$stmt = $mysqli->prepare($sql);
            $stmt->bind_param($s,$idusuarios); 
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
	 $cant=0;
	 $sql= "SELECT u.idusuarios, u.cedula, u.nombres, u.telefono, u.direccion, u.idciudades,c.ciudades,
u.fecha_nac,u.user, u.pass, u.acceso,u.estado
FROM usuarios u 
join ciudades c on u.idciudades=c.idciudades where u.estado=? and concat(u.cedula,' ',u.nombres) like ?  limit 10"; 
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
		      $idusuarios=$valor['idusuarios'];  
		  	  $cedula=utf8_encode($valor['cedula']);
			  $nombres=utf8_encode($valor['nombres']);
			  $telefono=utf8_encode($valor['telefono']);
			  $direccion=utf8_encode($valor['direccion']);
			  $idciudades=utf8_encode($valor['idciudades']);
			  $ciudades=utf8_encode($valor['ciudades']);
			  $fecha_nac=utf8_encode($valor['fecha_nac']);
			  $user=utf8_encode($valor['user']);
			  $pass=utf8_encode($valor['pass']);
			  $acceso=utf8_encode($valor['acceso']);
			  $estado=utf8_encode($valor['estado']); 
	  	 $cant=$cant+1;
$pagina.="
<table  border='0' class='table_5 tabla_hovre' cellspacing='0' cellpadding='0'>
<tr onclick='obtener_datos_Usuarios(this)'>
<td class='td_detalles' style='width:0%;display: none;' id='td_idusuarios'>".$idusuarios."</td>
<td class='td_detalles' style='width:0%;display: none;' id='td_idciudades'>".$idciudades."</td>
<td class='td_detalles' style='width:0%;display: none;' id='td_user'>".$user."</td>
<td class='td_detalles' style='width:0%;display: none;' id='td_pass'>".$pass."</td>
<td class='td_detalles' style='width:5%;background-color:#e3e2e2;color:red;text-align:center;' id='td_cant'>".$cant."</td>
<td class='td_detalles' style='width:12.5%;' id='td_cedula'>".$cedula."</td>
<td class='td_detalles' style='width:12.5%;' id='td_nombres'>".$nombres."</td>
<td class='td_detalles' style='width:12.5%;' id='td_telefono'>".$telefono."</td>
<td class='td_detalles' style='width:12.5%;' id='td_direccion'>".$direccion."</td>
<td class='td_detalles' style='width:12.5;%' id='td_ciudades'>".$ciudades."</td>
<td class='td_detalles' style='width:12.5%;' id='td_fecha_nac'>".$fecha_nac."</td>
<td class='td_detalles' style='width:10%;' id='td_acceso'>".$acceso."</td>
<td class='td_detalles' style='width:10%;' id='td_estado' >".$estado."</td>
</tr>
</table>";		  
	  }
 }

  $informacion =array("1" => $pagina,"2" => $cant);
echo json_encode($informacion);	
exit;
}
function buscar_combo_usuarios() {
	$mysqli=conectar_al_servidor();
	 $pagina='<option value ="">SELECCIONAR</option>';
	 $sql= "SELECT idusuarios,concat(nombres,' (',acceso,')') as usuario FROM usuarios order by nombres asc"; 
   $stmt = $mysqli->prepare($sql);
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
   }
 
 $result = $stmt->get_result();
 $valor= mysqli_num_rows($result);
 if ($valor>0){
	  while ($valor= mysqli_fetch_assoc($result))
 {  
		      $idbarrios=$valor['idusuarios'];  
		  	  $barrios=utf8_encode($valor['usuario']);
              $pagina.="<option value ='".$idbarrios."'>".$barrios."</option>";	  
	  }
 }

 $informacion =array("1" => "exito","2" => $pagina);
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