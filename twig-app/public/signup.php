<?php
require_once '../vendor/autoload.php';

$loader = new \Twig\Loader\FilesystemLoader('../templates');
$twig = new \Twig\Environment($loader);

echo $twig->render('auth/signup.html.twig', [
    'page_title' => 'Sign Up - Ticket Management App'
]);
?>