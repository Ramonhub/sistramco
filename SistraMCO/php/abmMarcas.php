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
				
			
		$idmarcas = $_POST['idmarcas'];
		$idmarcas = utf8_decode($idmarcas);
		
		$marcas = $_POST['marcas'];
		$marcas = utf8_decode($marcas);
		
		
	
	
			mantenimiento($func,$idmarcas,$marcas);
		}
		}	


function mantenimiento($func,$idmarcas,$marcas){
	if( $marcas=="" ){
    echo "camposvacio";	
    exit;
	}
	
	
$mysqli=conectar_al_servidor();
if($func=='guardar'){
$consulta= "Select count(*) from marcas where idmarcas=?  ";
$stmt = $mysqli->prepare($consulta);
$ss='s';
$stmt->bind_param($ss, $idmarcas); 
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
		$sql="insert into marcas (marca,estado) value (upper(?),'ACTIVO')";
		    $s='s';
			$stmt = $mysqli->prepare($sql);
            $stmt->bind_param($s,$marcas); 
	}
	if($func=='editar'){
		
	    $sql='update marcas set marca=upper(?),estado="ACTIVO" where idmarcas=?';
		
		$s='si';
			$stmt = $mysqli->prepare($sql);
            $stmt->bind_param($s,$marcas,$idmarcas); 
	} 
	if($func=='eliminar'){
		
	    $sql="update marcas set estado='ELIMINADO' where idmarcas=?";
		
		$s='i';
			$stmt = $mysqli->prepare($sql);
            $stmt->bind_param($s,$idmarcas); 
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
	 $sql= "Select idmarcas,marca,estado from marcas where estado=? and marca like ? "; 
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
		  
		  
		       
		      $idmarcas=$valor['idmarcas'];  
		  	  $marcas=utf8_encode($valor['marca']);
			  $estado=utf8_encode($valor['estado']);
			 $cant=$cant+1;
		  	 
		  	  $pagina.="
<table  border='0' class='table_5' cellspacing='0' cellpadding='0'>
<tr onclick='obtener_datos_marcas(this)'>
<td class='td_detalles' style='width:5%;background-color:#e3e2e2;color:red;text-align:center;'>".$cant."</td>
<td class='td_detalles' id='td_idmarcas'>".$idmarcas."</td>
<td class='td_detalles' id='td_marcas'>".$marcas."</td>
<td class='td_detalles' id='td_estado' >".$estado."</td>
</tr>
</table>";		  
	  }
 }

  $informacion =array("1" => $pagina,"2" => $cant);
echo json_encode($informacion);	
exit;
}

function buscar_combo()
{
	$mysqli=conectar_al_servidor();
	 $pagina='<option value ="">SELECCIONAR</option>';
	 $sql= "Select idmarcas,marca from marcas where estado='ACTIVO'"; 
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
		      $idmarcas=$valor['idmarcas'];  
		  	  $marcas=utf8_encode($valor['marca']);
              $pagina.="<option value ='".$idmarcas."'>".$marcas."</option>";	  
	  }
 }

 $informacion =array("1" => "exito","2" => $pagina);
echo json_encode($informacion);	
exit;
}


verificar_datos();

?>