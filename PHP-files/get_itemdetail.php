<?php

$conn = @new mysqli('localhost', 'root', 'root', 'smartscan');

if (!$conn -> connect_error) {

	$linkId = $_POST['linkId'];

	$qry = "SELECT linkNaam,name, title, description, prijsStuk, foto, products.id, linkStart, linkStop
			FROM link_details
			INNER JOIN products ON (products.id = link_details.productId)
			INNER JOIN links ON (links.linkId = link_details.linkId)
			WHERE link_details.linkId ='" .$linkId. "'";

	$result = $conn -> query($qry);
	$singleResult = mysqli_fetch_assoc($result);

	if (mysqli_num_rows($result) > 0) {
		$list = array();
		mysqli_data_seek($result, 0);

		while ($singleResult = mysqli_fetch_assoc($result)) {
			$response = array(
				"getItem" => true, 
				"linkNaam" => $singleResult['linkNaam'], 
				"pMerk" => $singleResult['name'], 
				"pId" => $singleResult['id'], 
				"pTitel" => $singleResult['title'], 
				"pFoto" => $singleResult['foto'], 
				"pBeschrijving" => $singleResult['description'], 
				"pPrijs" => $singleResult['prijsStuk'],
				"pStart" => $singleResult['linkStart'],
				"pStop" => $singleResult['linkStop']);

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