
<?php

$token = "DATABASE TOKEN OBJECT";
$not = "DATABASE OBJECT NOTIFICATION";
$data = null;

$headers = [
    'Authorization:key=Clave del servidor FCM',
    'Content-Type: application/json'
];

if($token->platform === 'ios') {
    $data = [
        'to' => $token->device_token,
        'notification' => [
            'body' 	=> $notification_request->message,
            'title'	=> $notification_request->title,
        ],
        "data" => [// aditional data for iOS
            "extra-key" => "extra-value",
        ],
        'notId' => $not->id,//unique id for each notification
    ];
} elseif ($token->platform === 'android') {
    $data = [
        'to' => $token->device_token,
        'data' => [
            'body' 	=> $notification_request->message,
            'title'	=> $notification_request->title,
        ]
    ];
}
$ch = curl_init();
curl_setopt( $ch,CURLOPT_URL, 'https://gcm-http.googleapis.com/gcm/send' );
curl_setopt( $ch,CURLOPT_POST, true );
curl_setopt( $ch,CURLOPT_HTTPHEADER, $headers );
curl_setopt( $ch,CURLOPT_RETURNTRANSFER, true );
curl_setopt( $ch,CURLOPT_SSL_VERIFYPEER, false );
curl_setopt( $ch,CURLOPT_POSTFIELDS, json_encode( $data ) );
curl_setopt($ch, CURLOPT_FAILONERROR, TRUE);
$result = curl_exec($ch);
curl_close( $ch );

?>