<?php
require_once('connection.php');
$conn = @ new mysqli($dbserver,$dbuser,$dbpass,$dbase);

if (!$conn -> connect_error) {

	$linkId = $_POST['linkId'];

	$qry = "SELECT links.linkId, linkNaam,name, title, description, price, photo, products.id, linkStart, linkStop, link_details.productId,linkHoofdproduct
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
				"linkId"=>$singleResult['linkId'], 
				"id" => $singleResult['productId'], 
				"linkNaam" => $singleResult['linkNaam'], 
				"pMerk" => $singleResult['name'], 
				"pId" => $singleResult['id'], 
				"pTitel" => $singleResult['title'], 
				"pFoto" => $singleResult['photo'], 
				"pBeschrijving" => $singleResult['description'], 
				"pPrijs" => $singleResult['price'],
				"pStart" => $singleResult['linkStart'],
				"pStop" => $singleResult['linkStop'],
				"hoofdProduct" => $singleResult['linkHoofdproduct']);

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