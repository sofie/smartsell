<?php

$conn = @new mysqli('localhost', 'root', 'root', 'smartscan');

if (!$conn -> connect_error) {
	$productId = $_POST['productId'];
	$linkId = $_POST['linkId'];

		/*$qryProduct = "SELECT *
					   FROM tblBevat
					   WHERE productId = '" . $productId . "' AND linkId = '" . $linkId . "'";
					 
		$query = $conn -> query($qryProduct);
		
		if ($num_rows = $query -> num_rows = 0) {
			$response = array('add' => false);
			echo json_encode($response);
		} else {*/
			$insertQry = "INSERT INTO link_details (linkId,productId) VALUES ('" . $linkId . "','" . $productId . "')";
			$queryInsert = $conn -> query($insertQry);
			if($queryInsert){
				$response = array('add' => true,'QryAddProduct'=>$queryInsert);
				echo json_encode($response);
			}else{
				$response = array('add' => false);
				echo json_encode($response);
			}
		//}
} else {
	throw new Exception('Oeps, geen connectie.');

	echo "Oeps, geen connectie.";
	exit ;
}
?>