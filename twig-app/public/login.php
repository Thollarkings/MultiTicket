<?php
require_once '../vendor/autoload.php';

$loader = new \Twig\Loader\FilesystemLoader('../templates');
$twig = new \Twig\Environment($loader);

echo $twig->render('auth/login.html.twig', [
    'page_title' => 'Login - Ticket Management App'
]);
?>