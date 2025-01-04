<?php
session_start();

if (isset($_SESSION['voted'])) {
    echo json_encode(['success' => false, 'message' => 'Vous avez déjà voté.']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$participantId = $data['participantId'];

if (!file_exists('votes.json')) {
    file_put_contents('votes.json', json_encode([]));
}

$votes = json_decode(file_get_contents('votes.json'), true);

if (!isset($votes[$participantId])) {
    $votes[$participantId] = 0;
}

$votes[$participantId]++;
file_put_contents('votes.json', json_encode($votes));

$_SESSION['voted'] = true;

echo json_encode(['success' => true]);
?>
