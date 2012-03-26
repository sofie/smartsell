<?php

$conn = @new mysqli('localhost', 'root', 'root', 'SmartSell');

if (!$conn -> connect_error) {
	
	$linkId = $_POST['linkId'];
	
	/*$qry = "SELECT linkNaam, productMerk, productTitel, productBeschrijving, productPrijsStuk, productFoto, tblProduct.productId
			FROM tblBevat
			INNER JOIN tblProduct ON (tblProduct.productId = tblBevat.bevatId)
			INNER JOIN tblLink ON (tblLink.linkId = tblBevat.linkId)
			WHERE tblBevat.linkId ='" .$linkId. "'";*/
	$qry = "SELECT linkNaam, productMerk, productTitel, productBeschrijving, productPrijsStuk, productFoto, productId
			FROM tblLink
			INNER JOIN tblProduct ON (tblLink.linkProduct1 = tblProduct.productId)
			WHERE linkId ='" .$linkId. "'";

	$result = $conn -> query($qry);
	$singleResult = mysqli_fetch_assoc($result);

	if ($num_rows = $result -> num_rows > 0) {


			$response = array(
				"getItem" => true, 
				"linkNaam" => $singleResult['linkNaam'],
				"pMerk" => $singleResult['productMerk'],
				"pId" => $singleResult['productId'],
				"pTitel" => $singleResult['productTitel'],
				"pFoto" => $singleResult['productFoto'],
				"pBeschrijving" => $singleResult['productBeschrijving'],
				"pPrijs" => $singleResult['productPrijsStuk']);
				
	
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