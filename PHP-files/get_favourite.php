<?php
require_once('connection.php');
$conn = @ new mysqli($dbserver,$dbuser,$dbpass,$dbase);

if (!$conn -> connect_error) {

	$linkId = $_POST['linkId'];

	$qry = "SELECT linkHoofdproduct
			FROM links
			WHERE linkId ='" .$linkId. "'";

	$result = $conn -> query($qry);
	$singleResult = mysqli_fetch_assoc($result);

	if (mysqli_num_rows($result) > 0) {
		$singleResult = mysqli_fetch_assoc($result);
		$response = array(
				"getItem" => true, 
				"hoofdProduct" => $singleResult['linkHoofdproduct']);

	
		echo json_encode($response);

	} else {
		$response = array("getItem" => false);
		echo json_encode($response);
		$conn -> close();
	}
} else {
	throw new Exception("Oeps, geen connectie.");

	echo "Oeps, geen connectie.";
	exit ;
}
?>  