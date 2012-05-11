<?php
require_once('connection.php');
$conn = @ new mysqli($dbserver,$dbuser,$dbpass,$dbase);

if (!$conn -> connect_error) {
	$linkId = $_POST['linkId'];
	$productId = $_POST['productId'];

	$qry = "SELECT * FROM link_details WHERE linkId = '" . mysqli_real_escape_string($conn, $linkId) . "' AND productId = '" . mysqli_real_escape_string($conn, $productId) . "'";

	$query = $conn -> query($qry);
	if ($num_rows = $query -> num_rows > 0) {
		$remove = "DELETE FROM link_details WHERE linkId='" . $linkId . "' AND productId = '" . $productId . "'";
		
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