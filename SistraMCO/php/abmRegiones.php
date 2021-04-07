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
				
			
		$idregiones = $_POST['idregiones'];
		$idregiones = utf8_decode($idregiones);
		
		$regiones = $_POST['regiones'];
		$regiones = utf8_decode($regiones);
		
		
	
	
			mantenimiento($func,$idregiones,$regiones);
		}
		}	


function mantenimiento($func,$idregiones,$regiones){
	if($idregiones=="" || $regiones=="" ){
    echo "camposvacio";	
    exit;
	}
	
	
$mysqli=conectar_al_servidor();
if($func=='guardar'){
$consulta= "Select count(*) from regiones where idregiones=?  ";
$stmt = $mysqli->prepare($consulta);
$ss='s';
$stmt->bind_param($ss, $idregiones); 
if ( ! $stmt->execute()) {
   echo "Error";
   exit;
}
$result = $stmt->get_result();
$nro_total=$result->fetch_row();
  $valor=$nro_total[0];

if($valor>=1) {
echo "duplicado";	
exit; 

}
		$sql="insert into regiones (idregiones,regiones,estado) value (upper(?),upper(?),'ACTIVO')";
		    $s='ss';
			$stmt = $mysqli->prepare($sql);
            $stmt->bind_param($s,$idregiones,$regiones); 
	}
	if($func=='editar'){
		
	    $sql='update regiones set regiones=upper(?),estado="ACTIVO" where idregiones=?';
		
		$s='si';
			$stmt = $mysqli->prepare($sql);
            $stmt->bind_param($s,$regiones,$idregiones); 
	} 
	if($func=='eliminar'){
		
	    $sql="update regiones set estado='ELIMINADO' where idregiones=?";
		
		$s='i';
			$stmt = $mysqli->prepare($sql);
            $stmt->bind_param($s,$idregiones); 
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
	 $sql= "Select idregiones,regiones,estado from regiones where estado=? and regiones like ?  limit 10"; 
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
		  
		  
		       
		      $idregiones=$valor['idregiones'];  
		  	  $regiones=utf8_encode($valor['regiones']);
			  $estado=utf8_encode($valor['estado']);
			 
		  	 
		  	  $pagina.="
<table  border='0' class='table_5' cellspacing='0' cellpadding='0'>
<tr onclick='obtener_datos_regiones(this)'>
<td class='td_detalles' id='td_idregiones'>".$idregiones."</td>
<td class='td_detalles' id='td_regiones'>".$regiones."</td>
<td class='td_detalles' id='td_estado' >".$estado."</td>
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
	 $sql= "Select idregiones,regiones from regiones where estado='ACTIVO'"; 
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
		      $idregiones=$valor['idregiones'];  
		  	  $regiones=utf8_encode($valor['regiones']);
              $pagina.="<option value ='".$idregiones."'>".$regiones."</option>";	  
	  }
 }

 $informacion =array("1" => "exito","2" => $pagina);
echo json_encode($informacion);	
exit;
}


verificar_datos();

?>