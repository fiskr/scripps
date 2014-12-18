<?php header("Content-type: text/css");
require "lessc.inc.php";
$less = new lessc;
echo $less->compileFile("common.less");
echo file_get_contents("modules.css");
echo file_get_contents("carousel.css");

?>