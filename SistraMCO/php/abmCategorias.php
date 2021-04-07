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
				
			
		$idcategorias = $_POST['idcategorias'];
		$idcategorias = utf8_decode($idcategorias);
		
		$categorias = $_POST['categorias'];
		$categorias = utf8_decode($categorias);
		
		
	
	
			mantenimiento($func,$idcategorias,$categorias);
		}
		}	


function mantenimiento($func,$idcategorias,$categorias){
	if( $categorias=="" ){
    echo "camposvacio";	
    exit;
	}
	
	
$mysqli=conectar_al_servidor();
if($func=='guardar'){
$consulta= "Select count(*) from categorias where idcategorias=?  ";
$stmt = $mysqli->prepare($consulta);
$ss='s';
$stmt->bind_param($ss, $idcategorias); 
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
		$sql="insert into categorias (categoria,estado) value (upper(?),'ACTIVO')";
		    $s='s';
			$stmt = $mysqli->prepare($sql);
            $stmt->bind_param($s,$categorias); 
	}
	if($func=='editar'){
		
	    $sql='update categorias set categoria=upper(?),estado="ACTIVO" where idcategorias=?';
		
		$s='si';
			$stmt = $mysqli->prepare($sql);
            $stmt->bind_param($s,$categorias,$idcategorias); 
	} 
	if($func=='eliminar'){
		
	    $sql="update categorias set estado='ELIMINADO' where idcategorias=?";
		
		$s='i';
			$stmt = $mysqli->prepare($sql);
            $stmt->bind_param($s,$idcategorias); 
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
	 $sql= "Select idcategorias,categoria,estado from categorias where estado=? and categoria like ? "; 
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
		      $idcategorias=$valor['idcategorias'];  
		  	  $categorias=utf8_encode($valor['categoria']);
			  $estado=utf8_encode($valor['estado']);
			 $cant=$cant+1;
		  	 
		  	  $pagina.="
<table  border='0' class='table_5' cellspacing='0' cellpadding='0'>
<tr onclick='obtener_datos_categorias(this)'>
<td class='td_detalles' style='width:5%;background-color:#e3e2e2;color:red;text-align:center;'>".$cant."</td>
<td class='td_detalles' id='td_idcategorias'>".$idcategorias."</td>
<td class='td_detalles' id='td_categorias'>".$categorias."</td>
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
	 $sql= "Select idcategorias,categoria from categorias where estado='ACTIVO'"; 
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
		      $idcategorias=$valor['idcategorias'];  
		  	  $categorias=utf8_encode($valor['categoria']);
              $pagina.="<option value ='".$idcategorias."'>".$categorias."</option>";	  
	  }
 }

 $informacion =array("1" => "exito","2" => $pagina);
echo json_encode($informacion);	
exit;
}


verificar_datos();

?>