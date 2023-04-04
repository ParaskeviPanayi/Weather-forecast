<?php

$domainname = "dbserver.in.cs.ucy.ac.cy";
$username = "student";
$password = "gtNgMF8pZyZq6l53";
$dbName = "epl425";

function checkValidity($data)
{

if(count($data)===0){
http_response_code(400);
return false;
}

if(strlen(trim($data["username"]))===0 || strlen(trim($data["address"]))===0 || strlen(trim($data["region"]))===0 || strlen(trim($data["city"]))===0){
http_response_code(400);
return false;
}
return true;
}

if($_SERVER['REQUEST_METHOD']==='POST'){
if(strcasecmp($_SERVER["CONTENT_TYPE"],"application/json")==0){
    $json=trim(file_get_contents("php://input"));
    $data=json_decode($json,true);


    if(!checkValidity($data)){
        return;
    }

    $conn=mysqli_connect($domainname, $username, $password) or die("Could not connect: " . mysqli_error($conn));


    $username = mysqli_real_escape_string($conn,$data["username"]);
    $address = mysqli_real_escape_string($conn,$data["address"]);
    $region = mysqli_real_escape_string($conn,$data["region"]);
    $city = mysqli_real_escape_string($conn,$data["city"]);

    echo "A connection established\n";

    mysqli_select_db($conn,$dbName) or die($dbName . " failed to open " . mysqli_error($conn));

    echo "A db connection established\n";

    $time = time();


    $query = "INSERT INTO requests(username, timestamp, address, region, city, country) VALUES ('$username', $time, '$address', '$region', '$city', 'Cyprus')";
    $result = mysqli_query($conn, $query) or die("Invalid query\n". mysqli_error($conn));
    $num=mysqli_num_rows($result);


    mysqli_close($conn);
    echo "connection closed";


}
}

if($_SERVER['REQUEST_METHOD']==='GET'){

$conn=mysqli_connect($domainname, $username, $password) or die("Could not connect: " . mysqli_error($conn));
$username=mysqli_real_escape_string($conn,$_GET["username"]);
mysqli_select_db($conn, $dbName) or die("Invalid query\n" . mysqli_error($conn));

$arr=array();
$answerObject->array=$arr;

$query = "SELECT * FROM requests WHERE  username='ppanag03' ORDER BY id DESC"; 
$result = mysqli_query($conn, $query) or die("Invalid query"); 
$num = mysqli_num_rows($result);
for($i=0; $i<$num; $i++) {
 $row = mysqli_fetch_row($result);
 $answerObject->array[$i]->id = $row[0];

 $answerObject->array[$i]->username = $row[1];

 $answerObject->array[$i]->timestamp = $row[2];

 $answerObject->array[$i]->address = $row[3];

 $answerObject->array[$i]->region = $row[4];

 $answerObject->array[$i]->city =$row[5];

 $answerObject->array[$i]->country = $row[6];


}


$answerJSON = json_encode($answerObject);
echo $answerJSON;

mysqli_close($conn);
}

?>