<?php

$conn = @new mysqli('localhost', 'root', 'root', 'SmartSell');

if (!$conn -> connect_error) {
	$linkNaam = $_POST['linkNaam'];
	$linkProduct1 = $_POST['linkProduct1'];
	$linkProduct2 = $_POST['linkProduct2'];

	$qry = "SELECT linkNaam FROM tblLink WHERE linkNaam = '" . mysqli_real_escape_string($conn, $linkNaam) . "'";

	$query = $conn -> query($qry);
	if ($num_rows = $query -> num_rows > 0) {
		$response = array('add' => false);
		echo json_encode($response);
	} else {
		$insertNaam = "INSERT INTO tblLink (linkNaam) 
					   VALUES ('" . mysqli_real_escape_string($conn, $linkNaam) . "')";

		$queryInsert = $conn -> query($insertNaam);
		if ($queryInsert) {
			
			$qryId = "SELECT linkId
						FROM tblLink
						WHERE linkNaam = '" . $linkNaam . "'";
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
	}
} else {
	throw new Exception('Oeps, geen connectie.');

	echo "Oeps, geen connectie.";
	exit ;
}
?>  