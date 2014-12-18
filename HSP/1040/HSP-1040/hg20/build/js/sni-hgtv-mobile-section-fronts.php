<?php 
  header('Content-type: text/javascript');
  require_once 'jsmin-1.1.1.php';
  
  if (isset($_REQUEST['minify'])) JSMin::$should_minify = $_REQUEST['minify'];
?>

/* sni-hgtv - <?php echo date('r') ?> */

if( typeof(HGTV) == "undefined" ) {
  HGTV = {};
}
if( typeof(SNI) == "undefined" ) {
  SNI = {};
}

<?php
  
 $list_file = 'hgtv-mobile-section-fronts.lst';
    $files = file($list_file);
    if (! $files) exit("Missing input list file: " . $list_file . '<br>');
    $output_file = 'sni-hgtv.2.0.js';
    // filename and timestamp at top of file
    $result = '/* ' . $output_file . ' - ' . date('r') . " */\n";
    foreach ($files as $file) {
      $result .= JSMin::minify(file_get_contents(rtrim('../../js/' . $file)));
    }
    echo $result;
?>


