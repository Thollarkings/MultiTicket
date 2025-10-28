<?php
require_once '../vendor/autoload.php';

$loader = new \Twig\Loader\FilesystemLoader('../templates');
$twig = new \Twig\Environment($loader);

echo $twig->render('landing.html.twig', [
    'page_title' => 'Ticket Management App - Twig'
]);
?>