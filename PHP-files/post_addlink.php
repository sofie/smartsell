<?php

$conn = @new mysqli('localhost', 'root', 'root', 'SmartSell');

if (!$conn -> connect_error) 
{
	$linkNaam = $_POST['linkNaam'];
	$linkProduct1 = $_POST['linkProduct1'];

	$qry = "SELECT linkNaam FROM tblLink WHERE linkNaam = '" . mysqli_real_escape_string($conn,$linkNaam) . "'";
	
	$query = $conn -> query($qry);
	if ($num_rows = $query -> num_rows > 0) 
	{
		$response = array('add' => false);
		echo json_encode($response);
	} 
	else
	{
		$insert = 
			"INSERT INTO tblLink (linkNaam, linkProduct1) 
			VALUES ('" . mysqli_real_escape_string($conn, $linkNaam) . "',
					'" . $linkProduct1 . "'
					)";

		$query = $conn -> query($insert);
		if ($query) 
		{
			$response = array('add' => true);
			echo json_encode($response);
			$conn -> close();
		} 
	}
} 
else 
{
	throw new Exception('Oeps, geen connectie.');

	echo "Oeps, geen connectie.";
	exit ;
}
?>  