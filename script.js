// Interactive button functionality
const button = document.getElementById('interactiveBtn');
const message = document.getElementById('message');

let clickCount = 0;

button.addEventListener('click', () => {
    clickCount++;
    message.textContent = `Button clicked ${clickCount} time${clickCount !== 1 ? 's' : ''}! 🎉`;
    message.classList.add('show');
    
    // Add a fun animation
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 100);
});

// Add some dynamic content on load
window.addEventListener('load', () => {
    console.log('Web app loaded successfully!');
    console.log('Repository: ofir-matrix/Test');
    console.log('Hosted at: https://ofir-matrix.github.io/Test/');
});
