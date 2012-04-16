<?php

$conn = @new mysqli('localhost', 'root', 'root', 'SmartSell');

if (!$conn -> connect_error) {
	$linkId = $_POST['linkId'];

	$qry = "SELECT linkId FROM tblLink WHERE linkId = '" . mysqli_real_escape_string($conn, $linkId) . "'";

	$query = $conn -> query($qry);
	if ($num_rows = $query -> num_rows > 0) {
		$remove = "DELETE FROM tblLink WHERE linkId='" . $linkId . "'";
		$queryRemove = $conn -> query($remove);
		if ($queryRemove) {
				$response = array('remove' => true);
				echo json_encode($response);
			}
		
	} else {
		$response = array('remove' => false);
		echo json_encode($response);
	}

} else {
	throw new Exception('Oeps, geen connectie.');

	echo "Oeps, geen connectie.";
	exit ;
}
?>  