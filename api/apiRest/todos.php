<?PHP


header("Access-Control-Allow-Origin: *");
	function sendMessage(){
		$content = array(
			"en" => 'English Message'
			);
		
		$fields = array(
			'app_id' => "8c623efe-fad5-417d-bed8-c9b5031804d1",
			//'include_player_ids' =>array("49b33fd0-9ca1-4b58-bf02-bc2f3dc09869"),
			'include_player_ids' =>array($_POST["onesignal"]),
			'data' => array("foo" => "bar"),
			'contents' => $content
		);
		
		$fields = json_encode($fields);
    	print("\nJSON sent:\n");
    	print($fields);
		
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, "https://onesignal.com/api/v1/notifications");
		curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json; charset=utf-8',
												   'Authorization: Basic OThhNzg3MDEtYjU0Ny00ZTY5LTk4Y2ItY2QzZWVhZjg0N2E1'));
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
		curl_setopt($ch, CURLOPT_HEADER, FALSE);
		curl_setopt($ch, CURLOPT_POST, TRUE);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);

		$response = curl_exec($ch);
		curl_close($ch);
		
		return $response;
	}
	
	$response = sendMessage();
	$return["allresponses"] = $response;
	$return = json_encode( $return);
	
	print("\n\nJSON received:\n");
	print($return);
	print("\n");
?>