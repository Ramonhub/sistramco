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
		
		if($func=='guardar' || $func=='editar' || $func=='eliminar'){
				
		$idciudades = $_POST['idciudades'];
		$idciudades = utf8_decode($idciudades);
		
		$ciudades = $_POST['ciudades'];
		$ciudades = utf8_decode($ciudades);
					
		$departamentos_iddepartamentos = $_POST['departamentos_iddepartamentos'];
		$departamentos_iddepartamentos = utf8_decode($departamentos_iddepartamentos);
		
		mantenimiento($func,$idciudades,$ciudades,$departamentos_iddepartamentos);
		}
		}	


function mantenimiento($func,$idciudades,$ciudades,$departamentos_iddepartamentos){
	if($idciudades=="" || $ciudades=="" || $departamentos_iddepartamentos=="" ){
    echo "camposvacio";	
    exit;
	}

$mysqli=conectar_al_servidor();
if($func=='guardar'){
$consulta= "Select count(*) from ciudades where idciudades=?  ";
$stmt = $mysqli->prepare($consulta);
$ss='s';
$stmt->bind_param($ss, $idciudades); 
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
   $sql="insert into ciudades (idciudades,ciudades,departamentos_iddepartamentos,estado) value (upper(?),upper(?),upper(?),'ACTIVO')";
   $s='sss';
   $stmt = $mysqli->prepare($sql);
   $stmt->bind_param($s,$idciudades,$ciudades,$departamentos_iddepartamentos); 
}else if($func=='editar'){
		
	    $sql='update ciudades set ciudades=upper(?),departamentos_iddepartamentos=upper(?),estado="ACTIVO" where idciudades=?';
		$s='ssi';
			$stmt = $mysqli->prepare($sql);
            $stmt->bind_param($s,$ciudades,$departamentos_iddepartamentos,$idciudades); 
	} else if($func=='eliminar'){
		
	    $sql="update ciudades set estado='ELIMINADO' where idciudades=?";
		
		$s='i';
			$stmt = $mysqli->prepare($sql);
            $stmt->bind_param($s,$idciudades); 
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
	 $sql= "SELECT c.idciudades,c.ciudades,c.departamentos_iddepartamentos,d.departamentos,c.estado
FROM ciudades c 
join departamentos d on c.departamentos_iddepartamentos=d.iddepartamentos where c.estado=? and c.ciudades like ?  limit 10"; 
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
		      $idciudades=$valor['idciudades'];  
		  	  $ciudades=utf8_encode($valor['ciudades']);
			   $departamentos_iddepartamentos=utf8_encode($valor['departamentos_iddepartamentos']);
			    $departamentos=utf8_encode($valor['departamentos']);
			  $estado=utf8_encode($valor['estado']); 
	  	 
$pagina.="
<table  border='0' class='table_5' cellspacing='0' cellpadding='0'>
<tr onclick='obtener_datos_Ciudades(this)'>
<td class='td_detalles' style='width:20%;' id='td_idCiudades'>".$idciudades."</td>
<td class='td_detalles' style='width:20%;' id='td_Ciudades'>".$ciudades."</td>
<td class='td_detalles' style='width:20%;display: none;' id='td_departamentos_iddepartamentos'>".$departamentos_iddepartamentos."</td>
<td class='td_detalles' style='width:20%;' id='td_departamentos'>".$departamentos."</td>
<td class='td_detalles' style='width:20%;' id='td_estado' >".$estado."</td>
</tr>
</table>";		  
	  }
 }

  $informacion =array("1" => $pagina);
echo json_encode($informacion);	
exit;
}

function buscar_combo()
{
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
 if ($valor>0){
	  while ($valor= mysqli_fetch_assoc($result))
 {  
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