<?php

$conn = @new mysqli('localhost', 'root', 'root', 'SmartSell');

if (!$conn -> connect_error) 
{
	$qry = "SELECT linkNaam FROM tblLink LIMIT 0, 30";
	
	$query = $conn -> query($qry);
	if ($num_rows = $query -> num_rows > 0) 
	{
		$result =$conn -> query($qry);
		//while($singleResult = mysqli_fetch_assoc($result));
		$response = array('getLink' => true,'result'=>$result);
		echo json_encode($response);
	} 
	else 
	{
		$response = array('getLink' => false);
		echo json_encode($response);
		$conn -> close();		
	}
} 
else 
{
	throw new Exception('Oeps, geen connectie.');

	echo "Oeps, geen connectie.";
	exit ;
}
?>  