<?php
require_once('connection.php');
$conn = @ new mysqli($dbserver,$dbuser,$dbpass,$dbase);

if (!$conn -> connect_error) {
	$productBarcode = $_POST['productBarcode'];
	$linkId = $_POST['linkId'];

	$qryId = "SELECT id
				FROM products
				WHERE barcode = '" . $productBarcode . "'";
	$queryId = $conn -> query($qryId);
	if($queryId->num_rows==0){
			$response = array('noProduct' => true);
			echo json_encode($response);
	}else{
		$singleResultId = mysqli_fetch_assoc($queryId);
		
			$insertQry = "	INSERT INTO link_details (linkId,productId) VALUES ('" . $linkId . "','".$singleResultId['id']."')";
			$queryInsert = $conn -> query($insertQry);
			if($queryInsert){
				$response = array('add' => true,'QryAddProduct'=>$queryInsert);
				echo json_encode($response);
			}else{
				$response = array('add' => false);
				echo json_encode($response);
			}
	}
} else {
	throw new Exception('Oeps, geen connectie.');

	echo "Oeps, geen connectie.";
	exit ;
}
?>