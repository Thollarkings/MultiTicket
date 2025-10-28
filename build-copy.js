// build-copy.js
const { execSync } = require('child_process');

// Helper function to run shell commands (using cp -R for Unix/Linux/macOS)
const run = (command) => {
    try {
        execSync(command, { stdio: 'inherit' });
    } catch (error) {
        console.error(`Failed to execute command: ${command}. Ensure you have 'cp' and 'mkdir' available, or adjust for your OS (e.g., use 'xcopy' on Windows).`, error);
        process.exit(1);
    }
};

console.log('--- 1. Setting up final directory structure in dist ---');
// Create all necessary nested folders
run('mkdir -p dist/deploy/react-app dist/deploy/vue-app dist/twig-app/static dist/shared-assets');


console.log('--- 2. Copying App Build Outputs ---');
// React: Copy the build output (e.g., from react-app/dist) into the target path
run('cp -R react-app/dist/* dist/deploy/react-app/');

// Vue: Copy the build output (e.g., from vue-app/dist) into the target path
run('cp -R vue-app/dist/* dist/deploy/vue-app/');


console.log('--- 3. Copying Static and Root Assets ---');

// Twig/Static App: Copy the contents of twig-app/static/
run('cp -R twig-app/static/* dist/twig-app/static/'); 

// Root HTML and CSS
run('cp index.html mainpage.css dist/');

// Shared Assets (Wave SVG)
run('cp shared-assets/wave-hero.svg dist/shared-assets/');


console.log('✅ All deployment assets successfully consolidated into the "dist" folder!');