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
$css .= file_get_contents("ontv.less");
$css .= file_get_contents("dcg.less");
$css .= file_get_contents("portPromo.less");
$css .= file_get_contents("social.less");
$css .= file_get_contents("pbt.less");
$css .= file_get_contents("modal.less");
//section fronts and supersections 
$css .= file_get_contents("tabs.less");
$css .= file_get_contents("sections.less");

//detail pages
//$css .= file_get_contents("banners.less");
$css .= file_get_contents("detail.less");
$css .= file_get_contents("video.less");
$css .= file_get_contents("dream.less");
$css .= file_get_contents("article.less");
$css .= file_get_contents("uber.less");
$css .= file_get_contents("shows.less");
echo $less->compile($css);

?>
