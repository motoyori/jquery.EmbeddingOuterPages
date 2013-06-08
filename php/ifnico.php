<?php
//get引数の内容をscriptタグ化してセットする。
$URL = "";
$GET = "";
foreach($_GET as $K => $V){
	if(strcmp($K, "url")===0){
		$URL = $V;
	}else{
		$GET .= (strcmp($GET, "")===0) ? "?".$K."=".$V : "&".$K."=".$V;
	}
}
?>
<script type="text/javascript" src="<?php echo $URL.$GET; ?>"></script>