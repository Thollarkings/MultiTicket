<?php
require_once '../vendor/autoload.php';

$loader = new \Twig\Loader\FilesystemLoader('../templates');
$twig = new \Twig\Environment($loader);

echo $twig->render('tickets/index.html.twig', [
    'page_title' => 'All Tickets - Ticket Management App',
    'user' => [
        'name' => 'User'
    ]
]);
?>