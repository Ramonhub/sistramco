<?php
function preparar_variables($datos){
$datos = str_replace("‘", "", $datos);
$datos = str_replace(";", "", $datos);
$datos = str_replace("\"", "", $datos);
$datos = securitymax($datos);
return $datos;
}
function securitymax($valores) {
$valores = htmlspecialchars(trim(addslashes(stripslashes(strip_tags($valores)))));
$valores = str_replace(chr(160),'',$valores);
return $valores;
}
?>