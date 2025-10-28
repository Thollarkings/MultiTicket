# Create main project folder
mkdir -p twig-app && cd twig-app

# ======================
# Templates structure
# ======================
mkdir -p templates/components templates/auth templates/dashboard templates/tickets

# Create template files
touch templates/base.html.twig
touch templates/components/header.html.twig templates/components/footer.html.twig \
      templates/components/auth_form.html.twig templates/components/ticket_card.html.twig
touch templates/auth/login.html.twig templates/auth/signup.html.twig
touch templates/dashboard/index.html.twig
touch templates/tickets/index.html.twig templates/tickets/create.html.twig templates/tickets/edit.html.twig
touch templates/landing.html.twig

# ======================
# Public structure
# ======================
mkdir -p public/assets/css public/assets/js

# Create PHP entry files
touch public/index.php public/login.php public/signup.php public/dashboard.php \
      public/tickets.php public/create-ticket.php public/edit-ticket.php

# Create asset files
touch public/assets/css/styles.css
touch public/assets/js/app.js public/assets/js/auth.js public/assets/js/tickets.js

# ======================
# Root files
# ======================
touch composer.json README.md

echo "✅ Twig app structure (with components, auth, and dashboard) created successfully!"

