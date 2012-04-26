<?php

$conn = @new mysqli('localhost', 'root', 'root', 'SmartSell');

if (!$conn -> connect_error) {
	$linkProduct1 = $_POST['linkProduct1'];
	$linkProduct2 = $_POST['linkProduct2'];

		$qryNaam1 = "SELECT productMerk
					 FROM tblProduct
					 WHERE productId = '" . $linkProduct1 . "'";
		$queryNaam1 = $conn -> query($qryNaam1);
		$singleResultNaam1 = mysqli_fetch_assoc($queryNaam1);
		$qryNaam2 = "SELECT productMerk
					 FROM tblProduct
					 WHERE productId = '" . $linkProduct2 . "'";
		$queryNaam2 = $conn -> query($qryNaam2);
		$singleResultNaam2 = mysqli_fetch_assoc($queryNaam2);
			
		$insertNaam = "INSERT INTO tblLink (linkNaam) 
					   VALUES ('" . $singleResultNaam1['productMerk'] . "' '" . $singleResultNaam2['productMerk'] . "')";
					   

		$queryInsert = $conn -> query($insertNaam);
		if ($queryInsert) {
			
			$qryId = "SELECT linkId
						FROM tblLink
						WHERE linkNaam = '" . $singleResultNaam1['productMerk'] . "' '" . $singleResultNaam2['productMerk'] . "'";
			$result = $conn -> query($qryId);
			$singleResult = mysqli_fetch_assoc($result);	
			
		
			$insertProd1 = "INSERT INTO tblBevat (linkId, productId) VALUES ('" . $singleResult['linkId'] . "','" . $linkProduct1 . "')";
			$insertProd2 = "INSERT INTO tblBevat (linkId, productId) VALUES ('" . $singleResult['linkId'] . "','" . $linkProduct2 . "')";

			$query2 = $conn -> query($insertProd1);
			$query3 = $conn -> query($insertProd2);
			
			if ($query2 && $query3) {
				$response = array('add' => true, 'linkId'=> $singleResult['linkId'], "Qry1"=>$insertProd1, "Qry2"=>$insertProd2);
				echo json_encode($response);
				//$conn -> close();
			}else{
				$response = array('add' => false);
				echo json_encode($response);
			}
			
			$conn -> close();
		}else{
			$response = array('add' => false);
			echo json_encode($response);
		}

} else {
	throw new Exception('Oeps, geen connectie.');

	echo "Oeps, geen connectie.";
	exit ;
}
?>  