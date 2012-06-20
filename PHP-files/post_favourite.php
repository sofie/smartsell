<?php
require_once('connection.php');
$conn = @ new mysqli($dbserver,$dbuser,$dbpass,$dbase);

if (!$conn -> connect_error) {
	$linkId = $_POST['linkId'];
	$productId=$_POST['productId'];
	

	$qry = "SELECT linkHoofdproduct FROM links WHERE linkId = '" . mysqli_real_escape_string($conn, $linkId) . "'";

	$query = $conn -> query($qry);
	if ($num_rows = $query -> num_rows > 0) {
		$updateQry = "UPDATE links SET linkHoofdproduct ='" . mysqli_real_escape_string($conn,$productId) . "' WHERE linkId='" .  mysqli_real_escape_string($conn,$linkId). "'";
		
		$query1 = $conn -> query($updateQry);

		if ($query1) {
			$response = array('update' => true,"Qry" => $updateQry);
			echo json_encode($response);
		} else {
			$response = array('update' => false);
			echo json_encode($response);
		}

		$conn -> close();
	} else {
		
		$response = array('update' => false);
		echo json_encode($response);

	}
} else {
	throw new Exception('Oeps, geen connectie.');

	echo "Oeps, geen connectie.";
	exit ;
}
?> 