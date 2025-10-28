<?php
require_once '../vendor/autoload.php';

$loader = new \Twig\Loader\FilesystemLoader('../templates');
$twig = new \Twig\Environment($loader);

// In a real app, you'd pass user data from session
// For demo, we'll pass minimal data for template rendering
echo $twig->render('dashboard/index.html.twig', [
    'page_title' => 'Dashboard - Ticket Management App',
    'user' => [
        'name' => 'User' // This would come from session in real app
    ]
]);
?>