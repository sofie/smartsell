<?php

$conn = @new mysqli('localhost', 'root', 'root', 'SmartSell');

if (!$conn -> connect_error) {
	
	
	$qry = "SELECT linkNaam, productMerk, linkId
			FROM tblLink
			INNER JOIN tblProduct ON ( tblProduct.productId = tblLink.linkProduct1 )";

	$result = $conn -> query($qry);
	$singleResult = mysqli_fetch_assoc($result);

	if ($num_rows = $result -> num_rows > 0) {
		$list = array();

		while ($singleResult = mysqli_fetch_assoc($result)) {
			$response = array("getLink" => true, "linkNaam" => $singleResult['linkNaam'],"linkId" => $singleResult['linkId'], "productNaam" => $singleResult['productMerk']);
			$list[] = $response;
		};
		echo json_encode($list);

	} else {
		$response = array("getLink" => false);
		echo json_encode($response);
		$conn -> close();
	}
} else {
	throw new Exception("Oeps, geen connectie.");

	echo "Oeps, geen connectie.";
	exit ;
}
?>  