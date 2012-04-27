<?php

$conn = @new mysqli('localhost', 'root', 'root', 'smartscan');

if (!$conn -> connect_error) {
	$linkId = $_POST['linkId'];
	$linkStart = $_POST['linkStart'];
	$linkStop = $_POST['linkStop'];
	

	$qry = "SELECT * FROM links WHERE linkId = '" . mysqli_real_escape_string($conn, $linkId) . "'";

	$query = $conn -> query($qry);
	if ($num_rows = $query -> num_rows > 0) {
		$updateQry = "UPDATE links SET linkStart='" . mysqli_real_escape_string($conn,$linkStart) . "', linkStop='" .  mysqli_real_escape_string($conn,$linkStop) . "' WHERE linkId='" .  mysqli_real_escape_string($conn,$linkId). "'";
		
		$query1 = $conn -> query($updateQry);

		if ($query1) {
			$response = array('update' => true, 'linkId' => $singleResult['linkId'], "Qry" => $updateQry);
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