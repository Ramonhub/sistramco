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
				
			
		$idplanmultas = $_POST['idplanmultas'];
		$idplanmultas = utf8_decode($idplanmultas);
		
		$planmultas = $_POST['descripcion'];
		$planmultas = utf8_decode($planmultas);
		
		$precio = $_POST['precio'];
		$precio = utf8_decode($precio);
		
		
	
	
			mantenimiento($func,$idplanmultas,$planmultas,$precio);
		}
		}	


function mantenimiento($func,$idplanmultas,$planmultas,$precio){
	if( $planmultas=="" || $precio=="" ){
    echo "camposvacio";	
    exit;
	}
	
	
$mysqli=conectar_al_servidor();
if($func=='guardar'){
$consulta= "Select count(*) from multas where idmultas=?  ";
$stmt = $mysqli->prepare($consulta);
$ss='s';
$stmt->bind_param($ss, $idplanmultas); 
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
		$sql="insert into multas (descripcion,precio,estado) value (upper(?),upper(?),'ACTIVO')";
		    $s='ss';
			$stmt = $mysqli->prepare($sql);
            $stmt->bind_param($s,$planmultas,$precio); 
	}
	if($func=='editar'){
		
	    $sql='update multas set descripcion=upper(?),precio=upper(?),estado="ACTIVO" where idmultas=?';
		
		$s='ssi';
			$stmt = $mysqli->prepare($sql);
            $stmt->bind_param($s,$planmultas,$precio,$idplanmultas); 
	} 
	if($func=='eliminar'){
		
	    $sql="update multas set estado='ELIMINADO' where idmultas=?";
		
		$s='i';
			$stmt = $mysqli->prepare($sql);
            $stmt->bind_param($s,$idplanmultas); 
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
	 $sql= "Select idmultas,descripcion,precio,estado from multas where estado=? and descripcion like ? "; 
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
		      $idplanmultas=$valor['idmultas'];  
		  	  $planmultas=utf8_encode($valor['descripcion']);
		  	  $precio=utf8_encode($valor['precio']);
			  $estado=utf8_encode($valor['estado']);
			 $cant=$cant+1;
		  	 
		  	  $pagina.="
<table  border='0' class='table_5' cellspacing='0' cellpadding='0'>
<tr onclick='obtener_datos_planmultas(this)'>
<td class='td_detalles' style='width:5%;background-color:#e3e2e2;color:red;text-align:center;'>".$cant."</td>
<td class='td_detalles' id='td_idplanmultas' style='width:23.7%;'>".$idplanmultas."</td>
<td class='td_detalles' id='td_planmultas'   style='width:23.7%;'>".$planmultas."</td>
<td class='td_detalles' id='td_precioplanmultas'       style='width:23.7%;'>".$precio."</td>
<td class='td_detalles' id='td_estado'       style='width:23.7%;'>".$estado."</td>
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
	 $sql= "Select idmultas,descripcion from multas where estado='ACTIVO'"; 
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
		      $idplanmultas=$valor['idmultas'];  
		  	  $planmultas=utf8_encode($valor['descripcion']);
              $pagina.="<option value ='".$idplanmultas."'>".$planmultas."</option>";	  
	  }
 }

 $informacion =array("1" => "exito","2" => $pagina);
echo json_encode($informacion);	
exit;
}


verificar_datos();

?>