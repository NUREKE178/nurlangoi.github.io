<?php
// Simple PHP upload handler example.
// Place this file next to gallery.html and create folder 'uploads' with write permissions.
// Usage: POST 'image' (file) and 'password' (field)

$UPLOAD_PASSWORD = getenv('UPLOAD_PASSWORD') ?: 'ibilim2025';
$UPLOAD_DIR = __DIR__ . '/uploads';
if (!is_dir($UPLOAD_DIR)) mkdir($UPLOAD_DIR, 0755, true);

header('Content-Type: application/json');

if (!isset($_POST['password']) || $_POST['password'] !== $UPLOAD_PASSWORD) {
    http_response_code(403);
    echo json_encode(['ok'=>false, 'message'=>'Invalid password']);
    exit;
}

if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(['ok'=>false, 'message'=>'No file uploaded or upload error']);
    exit;
}

$filename = time() . '-' . basename($_FILES['image']['name']);
$target = $UPLOAD_DIR . '/' . $filename;
if (move_uploaded_file($_FILES['image']['tmp_name'], $target)) {
    $url = 'uploads/' . $filename;
    echo json_encode(['ok'=>true, 'filename'=>$filename, 'url'=>$url]);
} else {
    http_response_code(500);
    echo json_encode(['ok'=>false, 'message'=>'Cannot move uploaded file']);
}
?>