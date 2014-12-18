<?php 

#
# CRITICAL DEVELOPER NOTE:  
#		to change the contents (component files) of the build, EDIT THE SEPARATE LIST FILES:
#			sni-hgtv-a.lst  and  ani-hgtv-b.lst
#		this script should NOT require modification except to change the basic build functionality (EXTREMELY RARE)
#

#	sni-hgtv.php HGTV.com CSS build script
#
#	the site CSS is organized into three files: 
#			sni-hgtv.2.0.css which imports sni-hgtv-a.2.0.css and sni-hgtv-b.2.0.css
#			(it was necessary to load the CSS rules in two separate files to work around the IE 4096 indentifier limit
#	this script can create static files (on disk) or else serve them dynamically, concatenating the individual 
#		component CSS files on demand (for development)
#
#	Parameters (in URL query string to sni-hgtv.php:
#	minify : 0 * -> don't minify
#					 1 * -> do minify
# output : screen * -> output via http, for dynamic mode
#					 file -> output to files on disk in current directory
# url : prod -> fix up relative and development image paths to absolute production paths
#       (anything else) * -> paths in source modules unaltered
# part : a -> part a; 
#				 b -> part b
#				 null/missing/other * -> all
#	*  == default
#
# notes:
# TO CHANGE WHICH COMPONENT FILES ARE INCLUDED:
#		edit the input files sni-hgtv-a.lst and sni-hgtv-b.lst
#		NEW CSS FILES SHOULD BE ADDED TO THE SECOND ('b') FILE
# TO BUILD PRODUCTION FILES:
#		sni-hgtv.php?url=prod&output=file&minify=1
#		in a local directory checked out from SVN
#		then FTP the files to the production server (drop: /webhgtv/hg20/css on feeds.hgtv.com)
#		files appear at: http://hgtv.sndimg.com/webhgtv/hg20/css/
# for dev and staging:
#		http://frontend.scrippsnetworks.com/hgtv/dev/css/sni-hgtv.php?minify=0 
#		in these cases, the files returned by these URLs import the individual partioned CSS files (parts a & b) 
#			created dynamically by this script
# summary: in STATIC mode (output=file), this script creates all three files (the main consisting of two import
#		statements, and the two files created; in DYNAMIC mode (output=screen, default), the script creates ONE of 
#		the three files (depending on 'part' param) and returns it via HTTP
#
# CHANGE LOG
# 2011-01-27 now default is minify=1  (specify minify=0 for unprocessed source modules for debugging)
#
#


	require_once 'cssmin.php';
	
	// class / object to contain configuration settings
	class CssBuildConfig {
		private $hgtvVer;
		private $minify;
		private $output;
		private $url;
		private $outputVals = array("screen", "file");
		private $urlVals = array("dev", "prod");
		function setHgtvVer($inVal) { $this->hgtvVer = $inVal; }
		function getHgtvVer() { return $this->hgtvVer; }
		function setMinify($inVal) { if ($inVal == '0' || $inVal == '1') { $this->minify = $inVal; } }
		function getMinify() { return $this->minify; }
		function setOutput($inVal) { 
			$inVal = strtolower($inVal);
			if (in_array($inVal, $this->outputVals)) { $this->output = $inVal; } 
		}
		function getOutput() { return $this->output; }
		function setUrl($inVal) { 
			$inVal = strtolower($inVal);
			if (in_array($inVal, $this->urlVals)) { $this->url = $inVal; } 
		}
		function getUrl() { return $this->url; }
	}

	$cfg = new CssBuildConfig;
	$cfg->setHgtvVer('2.0');
	$cfg->setMinify('1');
	$cfg->setOutput("screen");
	$cfg->setUrl("dev");
	
	
	// construct one of the partitioned CSS files by concatenating component source CSS files
	//		(specified in separate *.lst file)
	function buildCSSpart($css_part, $cfg)  {		
		$list_file = 'sni-hgtv-' . $css_part . '.2.0' . '.lst';
		$files = file($list_file);
		if (! $files) exit("Missing input list file: " . $list_file . '<br>');
		$output_file = 'sni-hgtv-' . $css_part . '.' . $cfg->getHgtvver() . '.css';
		// filename and timestamp at top of file
		$result = '/* ' . $output_file . ' - ' . date('r') . " */\n";
		foreach ($files as $file) {
			$result .= Minify_CSS::minify(file_get_contents(rtrim('../../css/' . $file)));
		}
		$result = fixPath($result, $cfg);
		if ($cfg->getOutput() == "file") {
			writeFile($output_file, $result);
		} else {
			header('Content-type: text/css');
			echo $result;	
		}
	}

	// expand absolute paths for production; stamp out any lingering dev paths
	function fixPath($result, $cfg) {
		if ($cfg->getUrl() == 'prod') {
			$result = str_replace(
					array('http://frontend.scrippsnetworks.com/hgtv/img/',
								'http://frontend.scrippsnetworks.com/hgtv/dev/img/',
								'http://frontend.scrippsnetworks.com/hgtv/staging/img/',
								'../../img/',
								'../img/'), 
					'http://hgtv.sndimg.com/webhgtv/hg20/imgs/', $result);
			// if, even after the string replacement, there are still references to
			// frontend.scrippsnetworks.com, an error message is output instead of the CSS
			if (strpos($result, 'http://frontend.scrippsnetworks.com') !== false) {
				header('Content-type: text/html');
				exit("There is still a CSS declaration pointing to frontend.scrippsnetworks.com!<br>Search the CSS for <em>frontend.scrippsnetworks.com</em> and change the url to an absolute path.<br>Output not created.<br>");
			}
		}
		return $result;
	}

	// write a string out as a named file
	function writeFile($output_file, $result) {
		$fp = @fopen($output_file, 'w');
		if ($fp === false) {
			exit("Unable to write $output_file<br>Check web server config (anonymous user permissions)<br>");
		} else {
			fwrite($fp, $result);
			fclose($fp);
			echo 'Created: ' . $output_file . "<br>";
			return true;
		}
	}

	// url: do we re-write URLs for prod?
	if (isset($_REQUEST['url'])) {
		$cfg->setUrl($_REQUEST['url']);
	}

	// override default target for production 
	if ($cfg->getUrl() == "prod") {
		$cfg->setOutput("file");
	}	
	// still allow explicit override of output target
	if (isset($_REQUEST['output'])) {
		$cfg->setOutput($_REQUEST['output']);
	}
	// ...and of minification
	if (isset($_REQUEST['minify'])) $cfg->setMinify($_REQUEST['minify']);
	Minify_CSS::$should_minify = $cfg->getMinify();

	$css_part = "";
	if (isset($_REQUEST['part'])) {
		$css_part = strtolower($_REQUEST['part']);
		if ($css_part == 'a' || $css_part == 'b') { 
			buildCSSpart($css_part, $cfg);
		} else {
			exit("Invalid 'part' parameter specified: 'a' or 'b'<br>");
		}
		return;
	} else {
		$output_file = 'sni-hgtv' . '.' . $cfg->getHgtvVer() . '.css';
		$result = '/* ' . $output_file . ' - ' . date('r') . " */\n";
		if ($cfg->getOutput() == "file") {
			$result .=  '@import url("sni-hgtv-a.' . $cfg->getHgtvVer() . '.css");' . " \n";
			$result .=  '@import url("sni-hgtv-b.' . $cfg->getHgtvVer() . '.css");' . " \n";
			writeFile($output_file, $result);
			buildCSSpart('a', $cfg);
			buildCSSpart('b', $cfg);
		} else {
			header('Content-type: text/css');
			$qstr = '?output=' . $cfg->getOutput() . '&url=' . $cfg->getUrl() . '&minify=' . $cfg->getMinify();
			$result .=  '@import url("' . basename($_SERVER['PHP_SELF']) . $qstr .'&part=a");' . " \n";
			$result .=  '@import url("' . basename($_SERVER['PHP_SELF']) . $qstr .'&part=b");' . " \n";
			echo $result;	
		}
	}
	exit(0);
	
?>
