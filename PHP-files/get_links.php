<?php

$conn = @new mysqli('localhost', 'root', 'root', 'smartscan');

if (!$conn -> connect_error) {
	
	
	$qry = "SELECT linkNaam, linkId
			FROM links";

	$result = $conn -> query($qry);
	$singleResult = mysqli_fetch_assoc($result);

	if (mysqli_num_rows($result) > 0) {
		$list = array();
		mysqli_data_seek($result,0);

		while ($singleResult = mysqli_fetch_assoc($result)) {
			$response = array("getLink" => true, "linkNaam" => $singleResult['linkNaam'],"linkId" => $singleResult['linkId']);
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