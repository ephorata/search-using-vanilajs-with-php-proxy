<?php
header("Access-Control-Allow-Origin:*");
header("Content-Type: application/json");

// will send api request to 
$url = "https://jsonplaceholder.typicode.com/comments?postId=3";
$ch = curl_init($url);


curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);

$resp = curl_exec($ch);
if($e = curl_error($ch)) {
    echo $e;
}else {
    echo($resp);
}

curl_close($ch);