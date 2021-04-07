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
		
		if($func=='buscarcombousuario'){		
			buscar_combo_municipalidades();	
		}
		
		if($func=='guardar' || $func=='editar' || $func=='eliminar'){
		
					
		$idmunicipalidades = $_POST['idmunicipalidades'];
		$idmunicipalidades = utf8_decode($idmunicipalidades);
		
	    $municipalidad = $_POST['municipalidad'];
		$municipalidad = utf8_decode($municipalidad);
		
	    $telefono = $_POST['telefono'];
		$telefono = utf8_decode($telefono);		
		
	    $direccion = $_POST['direccion'];
		$direccion = utf8_decode($direccion);		
		
	    $idciudades = $_POST['idciudades'];
		$idciudades = utf8_decode($idciudades);
	
		mantenimiento($func,$municipalidad,$telefono,$direccion,$idciudades,$idmunicipalidades);
		}
		}	


function mantenimiento($func,$municipalidad,$telefono,$direccion,$idciudades,$idmunicipalidades){
	if( $municipalidad=="" || $telefono=="" || $direccion=="" || $idciudades==""){
    echo "camposvacio";	
    exit;
	}

$mysqli=conectar_al_servidor();
if($func=='guardar'){
$consulta= "Select count(*) from municipalidades where idmunicipalidades=?  ";
$stmt = $mysqli->prepare($consulta);
$ss='s';
$stmt->bind_param($ss, $idmunicipalidades); 
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
   $sql="insert into municipalidades (municipalidad, telefono, direccion, idciudades, estado) value (upper(?),upper(?),upper(?),upper(?),'ACTIVO')";
   $s='ssss';
   $stmt = $mysqli->prepare($sql);
   $stmt->bind_param($s,$municipalidad,$telefono,$direccion,$idciudades); 
}else if($func=='editar'){
	    $sql='update municipalidades set municipalidad=upper(?), telefono=upper(?), direccion=upper(?), idciudades=upper(?), estado="ACTIVO" where idmunicipalidades=?';
		$s='ssssi';
			$stmt = $mysqli->prepare($sql);
            $stmt->bind_param($s,$municipalidad,$telefono,$direccion,$idciudades,$idmunicipalidades); 
	} else if($func=='eliminar'){
		
	    $sql="update municipalidades set estado='ELIMINADO' where idmunicipalidades=?";
		
		$s='i';
			$stmt = $mysqli->prepare($sql);
            $stmt->bind_param($s,$idmunicipalidades); 
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
	 $sql= "SELECT m.idMunicipalidades, m.municipalidad, m.telefono, m.direccion, m.idciudades,c.ciudades,d.departamentos, m.estado
 FROM municipalidades m
 join ciudades c on m.idciudades=c.idciudades
 join departamentos d on c.departamentos_iddepartamentos=d.iddepartamentos
 where m.estado=? and m.Municipalidad like ? "; 
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
		      $idMunicipalidades=$valor['idMunicipalidades'];  
			  $municipalidad=utf8_encode($valor['municipalidad']);
			  $telefono=utf8_encode($valor['telefono']);
			  $direccion=utf8_encode($valor['direccion']);
			  $idciudades=utf8_encode($valor['idciudades']);
			  $ciudades=utf8_encode($valor['ciudades']);
			  $departamentos=utf8_encode($valor['departamentos']);
			  $estado=utf8_encode($valor['estado']); 
	  	  $cant= $cant+1;
$pagina.="
<table  border='0' class='table_5' cellspacing='0' cellpadding='0'>
<tr onclick='obtener_datos_municipalidades(this)'>
<td class='td_detalles' style='width:0%;display: none;' id='td_idciudades'>".$idciudades."</td>
<td class='td_detalles' style='width:5%;background-color:#e3e2e2;color:red;text-align:center;'>".$cant."</td>
<td class='td_detalles' style='width:13.5%;' id='td_idMunicipalidades'>".$idMunicipalidades."</td>
<td class='td_detalles' style='width:13.5%;' id='td_municipalidad'>".$municipalidad."</td>
<td class='td_detalles' style='width:13.5%;' id='td_telefono'>".$telefono."</td>
<td class='td_detalles' style='width:13.5%;' id='td_direccion'>".$direccion."</td>
<td class='td_detalles' style='width:13.5%' id='td_ciudades'>".$ciudades."</td>
<td class='td_detalles' style='width:13.5%;' id='td_departamentos'>".$departamentos."</td>
<td class='td_detalles' style='width:13.5%;' id='td_estado' >".$estado."</td>
</tr>
</table>";		  
	  }
 }

  $informacion =array("1" => $pagina,"2" => $cant);
echo json_encode($informacion);	
exit;
}
function buscar_combo_municipalidades() {
	$mysqli=conectar_al_servidor();
	 $pagina='<option value ="">SELECCIONAR</option>';
	 $sql= "SELECT * FROM choferes;"; 
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
		      $idbarrios=$valor['idmunicipalidades'];  
		  	  $barrios=utf8_encode($valor['usuario']);
              $pagina.="<option value ='".$idbarrios."'>".$barrios."</option>";	  
	  }
 }

 $informacion =array("1" => "exito","2" => $pagina);
echo json_encode($informacion);	
exit;
}



verificar_datos();
?>