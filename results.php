<?php
if (!file_exists('votes.json')) {
    file_put_contents('votes.json', json_encode([]));
}

$votes = json_decode(file_get_contents('votes.json'), true);
echo json_encode($votes);
?>
