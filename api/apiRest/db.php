
<?php 

set_time_limit( 24192000 );
ini_set( 'memory_limit', '-1' );

$files = glob( 'db/*.DBF' );
foreach( $files as $file )
{
    echo "Processing: $file\n";
    $fileParts = explode( '/', $file );
    $endPart = $fileParts[key( array_slice( $fileParts, -1, 1, true ) )];
    $csvFile = preg_replace( '~\.[a-z]+$~i', '.csv', $endPart );

    if( !$dbf = dbase_open( $file, 0 ) ) die( "Could not connect to: $file" );
    $num_rec = dbase_numrecords( $dbf );
    $num_fields = dbase_numfields( $dbf );

    $fields = array();
    $out = '';

    for( $i = 1; $i <= $num_rec; $i++ )
    {
        $row = @dbase_get_record_with_names( $dbf, $i );
        $firstKey = key( array_slice( $row, 0, 1, true ) );
        foreach( $row as $key => $val )
        {
            if( $key == 'deleted' ) continue;
            if( $firstKey != $key ) $out .= ';';
            $out .= trim( $val );
            echo $row;
        }
        $out .= "\n";
    }
 echo $csvFile, $out;
    file_put_contents( $csvFile, $out );
}


?>