<?php

header("Content-type: text/css");

require "lessc.inc.php";

$formatter = new lessc_formatter_classic;
$formatter->indentChar = "\t";

$less = new lessc;

$less->setFormatter($formatter);

$css = file_get_contents("variables.less");
$css .= file_get_contents("hgtv-font-styles.less");
$css .= file_get_contents("mixins.less");
$css .= file_get_contents("common.less");
$css .= file_get_contents("modules.less");
$css .= file_get_contents("carousel.less");
$css .= file_get_contents("portPromo.less");
$css .= file_get_contents("tabs.less");
$css .= file_get_contents("sections.less");

echo $less->compile($css);

?>
