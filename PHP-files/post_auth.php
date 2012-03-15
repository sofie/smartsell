<?php

// Select your MySQL host, username and password
$con =@ new mysqli('localhost','root','root','SmartSell');  
if ($con->connect_error)  
{  
	echo "Oeps, geen connectie.";  
	exit;  
} 

$personeelNummer = $_POST['personeelNummer'];


$sql = "SELECT * FROM tblPersoneel WHERE personeelNummer = '" . mysqli_real_escape_string($con,$personeelNummer) ."'";
$query = $con->query($sql);
if ($num_rows = $query->num_rows > 0)
{
	$row = mysqli_fetch_array($query);
	$response = array(
		'logged' => true,
		'personeelNummer' => $row['personeelNummer']
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