<?php
require_once('connection.php');
$conn = @ new mysqli($dbserver,$dbuser,$dbpass,$dbase);

if (!$conn -> connect_error) {
	$linkProduct1 = $_POST['linkProduct1'];

		$qryNaam1 = "SELECT name
					 FROM products
					 WHERE id = '" . $linkProduct1 . "'";
		$queryNaam1 = $conn -> query($qryNaam1);
		$singleResultNaam1 = mysqli_fetch_assoc($queryNaam1);
		
		$bestaatAl = "SELECT * FROM links WHERE linkNaam = '".$singleResultNaam1['name']."'";
		$resultBestaatAl = $conn -> query($bestaatAl);
		
		if($resultBestaatAl->num_rows==0){
			$insertNaam = "INSERT INTO links (linkNaam) 
					   VALUES ('" . $singleResultNaam1['name'] . "')";
			$queryInsert = $conn -> query($insertNaam);
			if ($queryInsert) {
				
				$qryId = "SELECT linkId
							FROM links
							WHERE linkNaam = '" . $singleResultNaam1['name'] . "'";
				$result = $conn -> query($qryId);
				
					$singleResult = mysqli_fetch_assoc($result);
					$insertProd1 = "INSERT INTO link_details (linkId, productId) VALUES ('" . $singleResult['linkId'] . "','" . $linkProduct1 . "')";
		
					$query2 = $conn -> query($insertProd1);
					
					if ($query2) {
						$response = array('add' => true, 'linkId'=> $singleResult['linkId'],'linkNaam'=>$singleResultNaam1['name'], "Qry1"=>$insertProd1);
						echo json_encode($response);
						//$conn -> close();
					}else{
						$response = array('add' => false);
						echo json_encode($response);
					}
				
			}else{
				$response = array('add' => false);
				echo json_encode($response);
			}
		}else{
			$response = array('bestaatAl' => true);
			echo json_encode($response);
		}
		

} else {
	throw new Exception('Oeps, geen connectie.');

	echo "Oeps, geen connectie.";
	exit ;
}
?>  