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
				
			
		$idtiposactividades = $_POST['idtiposactividades'];
		$idtiposactividades = utf8_decode($idtiposactividades);
		
		$tiposactividades = $_POST['tipos'];
		$tiposactividades = utf8_decode($tiposactividades);
		
		
	
	
			mantenimiento($func,$idtiposactividades,$tiposactividades);
		}
		}	


function mantenimiento($func,$idtiposactividades,$tiposactividades){
	if( $tiposactividades=="" ){
    echo "camposvacio";	
    exit;
	}
	
	
$mysqli=conectar_al_servidor();
if($func=='guardar'){
$consulta= "Select count(*) from tiposactividades where idtiposactividades=?  ";
$stmt = $mysqli->prepare($consulta);
$ss='s';
$stmt->bind_param($ss, $idtiposactividades); 
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
		$sql="insert into tiposactividades (tipos,estado) value (upper(?),'ACTIVO')";
		    $s='s';
			$stmt = $mysqli->prepare($sql);
            $stmt->bind_param($s,$tiposactividades); 
	}
	if($func=='editar'){
		
	    $sql='update tiposactividades set tipos=upper(?),estado="ACTIVO" where idtiposactividades=?';
		
		$s='si';
			$stmt = $mysqli->prepare($sql);
            $stmt->bind_param($s,$tiposactividades,$idtiposactividades); 
	} 
	if($func=='eliminar'){
		
	    $sql="update tiposactividades set estado='ELIMINADO' where idtiposactividades=?";
		
		$s='i';
			$stmt = $mysqli->prepare($sql);
            $stmt->bind_param($s,$idtiposactividades); 
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
	 $sql= "Select idtiposactividades,tipos,estado from tiposactividades where estado=? and tipos like ? "; 
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
	  while ($valor= mysqli_fetch_assoc($result)) {
		      $idtiposactividades=$valor['idtiposactividades'];  
		  	  $tiposactividades=utf8_encode($valor['tipos']);
			  $estado=utf8_encode($valor['estado']);
			 $cant=$cant+1;
		  	 
		  	  $pagina.="
<table  border='0' class='table_5' cellspacing='0' cellpadding='0'>
<tr onclick='obtener_datos_tiposactividades(this)'>
<td class='td_detalles' style='width:5%;background-color:#e3e2e2;color:red;text-align:center;'>".$cant."</td>
<td class='td_detalles' id='td_idtiposactividades'>".$idtiposactividades."</td>
<td class='td_detalles' id='td_tiposactividades'>".$tiposactividades."</td>
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
	 $sql= "Select idtiposactividades,tipos from tiposactividades where estado='ACTIVO'"; 
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
		      $idtiposactividades=$valor['idtiposactividades'];  
		  	  $tiposactividades=utf8_encode($valor['tipos']);
              $pagina.="<option value ='".$idtiposactividades."'>".$tiposactividades."</option>";	  
	  }
 }

 $informacion =array("1" => "exito","2" => $pagina);
echo json_encode($informacion);	
exit;
}


verificar_datos();

?>