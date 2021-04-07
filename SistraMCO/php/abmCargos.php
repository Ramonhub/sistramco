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
				
			
		$idaccesos = $_POST['idaccesos'];
		$idaccesos = utf8_decode($idaccesos);
		
		$accesos = $_POST['accesos'];
		$accesos = utf8_decode($accesos);
		
		
	
	
			mantenimiento($func,$idaccesos,$accesos);
		}
		}	


function mantenimiento($func,$idaccesos,$accesos){
	if( $accesos=="" ){
    echo "camposvacio";	
    exit;
	}
	
	
$mysqli=conectar_al_servidor();
if($func=='guardar'){
$consulta= "Select count(*) from accesos where idaccesos=?  ";
$stmt = $mysqli->prepare($consulta);
$ss='s';
$stmt->bind_param($ss, $idaccesos); 
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
		$sql="insert into accesos (accesos,estado) value (upper(?),'ACTIVO')";
		    $s='s';
			$stmt = $mysqli->prepare($sql);
            $stmt->bind_param($s,$accesos); 
	}
	if($func=='editar'){
		
	    $sql='update accesos set accesos=upper(?),estado="ACTIVO" where idaccesos=?';
		
		$s='si';
			$stmt = $mysqli->prepare($sql);
            $stmt->bind_param($s,$accesos,$idaccesos); 
	} 
	if($func=='eliminar'){
		
	    $sql="update accesos set estado='ELIMINADO' where idaccesos=?";
		
		$s='i';
			$stmt = $mysqli->prepare($sql);
            $stmt->bind_param($s,$idaccesos); 
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
	 $sql= "Select idaccesos,accesos,estado from accesos where estado=? and accesos like ? "; 
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
		  
		  
		       
		      $idaccesos=$valor['idaccesos'];  
		  	  $accesos=utf8_encode($valor['accesos']);
			  $estado=utf8_encode($valor['estado']);
			 $cant=$cant+1;
		  	 
		  	  $pagina.="
<table  border='0' class='table_5' cellspacing='0' cellpadding='0'>
<tr onclick='obtener_datos_accesos(this)'>
<td class='td_detalles' style='width:5%;background-color:#e3e2e2;color:red;text-align:center;'>".$cant."</td>
<td class='td_detalles' id='td_idaccesos'>".$idaccesos."</td>
<td class='td_detalles' id='td_accesos'>".$accesos."</td>
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
	 $sql= "Select idaccesos,accesos from accesos where estado='ACTIVO'"; 
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
		      $idaccesos=$valor['idaccesos'];  
		  	  $accesos=utf8_encode($valor['accesos']);
              $pagina.="<option value ='".$accesos."'>".$accesos."</option>";
			   
            //   $pagina.="<option value ='".$idaccesos."'>".$accesos."</option>";	  
	  }
 }

 $informacion =array("1" => "exito","2" => $pagina);
echo json_encode($informacion);	
exit;
}


verificar_datos();

?>