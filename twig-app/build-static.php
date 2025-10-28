<?php
require_once 'vendor/autoload.php';

$loader = new \Twig\Loader\FilesystemLoader('templates');
$twig = new \Twig\Environment($loader);

// Clean and recreate static directory
if (is_dir('static')) {
    system('rm -rf static');
}
mkdir('static', 0755, true);

// Copy entire assets structure FIRST
system('cp -r public/assets static/');

// Pages to export
$pages = [
    'index' => ['template' => 'landing.html.twig', 'title' => 'Welcome - Ticket Management App'],
    'login' => ['template' => 'auth/login.html.twig', 'title' => 'Login - Ticket Management App'],
    'signup' => ['template' => 'auth/signup.html.twig', 'title' => 'Sign Up - Ticket Management App'],
    'dashboard' => ['template' => 'dashboard/index.html.twig', 'title' => 'Dashboard - Ticket Management App'],
    'tickets' => ['template' => 'tickets/index.html.twig', 'title' => 'All Tickets - Ticket Management App'],
    'create-ticket' => ['template' => 'tickets/create.html.twig', 'title' => 'Create Ticket - Ticket Management App'],
    'edit-ticket' => ['template' => 'tickets/edit.html.twig', 'title' => 'Edit Ticket - Ticket Management App']
];

foreach ($pages as $page => $data) {
    $html = $twig->render($data['template'], [
        'page_title' => $data['title'],
        'user' => ['name' => 'User']
    ]);
    
    // Comprehensive path replacements for static deployment
    $replacements = [
        'login.php' => 'login.html',
        'signup.php' => 'signup.html', 
        'dashboard.php' => 'dashboard.html',
        'tickets.php' => 'tickets.html',
        'create-ticket.php' => 'create-ticket.html',
        'edit-ticket.php' => 'edit-ticket.html',
        'index.php' => 'index.html',
        '.php"' => '.html"',
        '.php\'' => '.html\'',
        'action="login.php"' => 'onsubmit="event.preventDefault();"',
        'action="signup.php"' => 'onsubmit="event.preventDefault();"'
    ];
    
    foreach ($replacements as $search => $replace) {
        $html = str_replace($search, $replace, $html);
    }
    
    file_put_contents("static/{$page}.html", $html);
    echo "✅ Generated: static/{$page}.html\n";
}

// Now copy the UPDATED JavaScript files (overwrite the ones we copied earlier)
file_put_contents('static/assets/js/app.js', file_get_contents('public/assets/js/app.js'));
file_put_contents('static/assets/js/auth.js', file_get_contents('public/assets/js/auth.js'));

echo "🎉 Static export complete!\n";
echo "📁 Test with: cd twig-app/static && php -S localhost:8000\n";