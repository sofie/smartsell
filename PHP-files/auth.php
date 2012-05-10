<?php

//$con =@ new mysqli('http://www.bgdesign.be:3351','smartscan','smartscan','smartscan'); 
$con =@ new mysqli('localhost','root','root','smartscan'); 
 
if ($con->connect_error)  
{  
	echo "Oeps, geen connectie.";  
	exit;  
} 

$nummer = $_POST['personeelNummer'];


$sql = "SELECT * FROM personeel WHERE nummer = '" . mysqli_real_escape_string($con,$nummer) ."'";
$query = $con->query($sql);
if ($num_rows = $query->num_rows > 0)
{
	$row = mysqli_fetch_array($query);
	$response = array(
		'logged' => true,
		'personeelNummer' => $row['nummer']
	);
	echo json_encode($response);
}
else
{
	$response = array(
		'logged' => false,
		'message' => 'Onjuist personeelsnummer.'
	);
	echo json_encode($response);
}
?>