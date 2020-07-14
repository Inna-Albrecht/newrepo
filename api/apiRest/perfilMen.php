<?php
$target_dir = "public/img/perfilM/";
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
$dir = "http://".$_SERVER['SERVER_NAME'];
$collection = array();
/*
$collection[] = array('title' => 'sdfsdf', 'artist' =>'dsfsdf');
$collection[] = array('title' => 'dsfsdfs', 'artist' =>'dswdf');
$collection[] = array('title' => 'ssdfsf', 'artist' =>'dwer');
$collection[] = array('title' => 'sdsdfsd', 'artist' =>'dewrwedf');*/
foreach(glob($target_dir . '*.*') as $filename){
    // echo $dir. $filename;
	$imageFileType = pathinfo($filename,PATHINFO_EXTENSION);
	$filename = explode("/",$filename)[1];
	 $collection[] = array('fileName' =>  $filename, 'fullPath' =>$dir.$target_dir. $filename, 'icon'=>$imageFileType);
 }
 echo json_encode($collection);

?>