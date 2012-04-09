<?php

$conn = @new mysqli('localhost', 'root', 'root', 'SmartSell');

if (!$conn -> connect_error) {

	$linkId = $_POST['linkId'];

	$qry = "SELECT linkNaam, productMerk, productTitel, productBeschrijving, productPrijsStuk, productFoto, tblProduct.productId
			FROM tblBevat
			INNER JOIN tblProduct ON (tblProduct.productId = tblBevat.productId)
			INNER JOIN tblLink ON (tblLink.linkId = tblBevat.linkId)
			WHERE tblBevat.linkId ='" .$linkId. "'";

	$result = $conn -> query($qry);
	$singleResult = mysqli_fetch_assoc($result);

	if (mysqli_num_rows($result) > 0) {
		$list = array();
		mysqli_data_seek($result, 0);

		while ($singleResult = mysqli_fetch_assoc($result)) {
			$response = array("getItem" => true, "linkNaam" => $singleResult['linkNaam'], "pMerk" => $singleResult['productMerk'], "pId" => $singleResult['productId'], "pTitel" => $singleResult['productTitel'], "pFoto" => $singleResult['productFoto'], "pBeschrijving" => $singleResult['productBeschrijving'], "pPrijs" => $singleResult['productPrijsStuk']);

			$list[] = $response;
		};
		echo json_encode($list);

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