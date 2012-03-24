<?php

$conn = @new mysqli('localhost', 'root', 'root', 'SmartSell');

if (!$conn -> connect_error) {
	
	$linkId = $_POST['linkId'];
	
	$qry = "SELECT linkNaam, productMerk
			FROM tblLink
			INNER JOIN tblProduct ON(tblProduct.productId = tblLink.linkProduct1)
			WHERE linkId = '".$linkId."'";

	$result = $conn -> query($qry);
	$singleResult = mysqli_fetch_assoc($result);

	if ($num_rows = $result -> num_rows > 0) {

			$response = array(
				"getItem" => true, 
				"linkNaam" => $singleResult['linkNaam'],
				"linkProd1" => $singleResult['productMerk']
			);
	
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