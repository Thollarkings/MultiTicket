<?php
require_once '../vendor/autoload.php';

$loader = new \Twig\Loader\FilesystemLoader('../templates');
$twig = new \Twig\Environment($loader);

echo $twig->render('tickets/edit.html.twig', [
    'page_title' => 'Edit Ticket - Ticket Management App',
    'user' => [
        'name' => 'User'
    ]
]);
?>