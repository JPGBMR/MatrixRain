// Get the matrix container element
const matrixContainer = document.getElementById('matrix-container');

// Create a canvas element and append it to the matrix container
const canvas = document.createElement('canvas');
matrixContainer.appendChild(canvas);

// Get the 2D context of the canvas
const ctx = canvas.getContext('2d');

// Set initial canvas size to match the window dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Matrix rain effect parameters
let matrixColumns = Math.floor(canvas.width / 20);
const matrixDrops = Array.from({ length: matrixColumns }, () => Math.floor(Math.random() * canvas.height));

/**
 * Main function to draw the matrix rain effect
 */
function drawMatrix() {
    // Draw a semi-transparent black background to create the fading effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw green matrix characters
    ctx.fillStyle = '#00FF00';
    ctx.font = '15px Courier New';

    for (let i = 0; i < matrixDrops.length; i++) {
        // Generate a random matrix character
        const text = String.fromCharCode(Math.floor(Math.random() * 95) + 32);

        // Draw the matrix character at its position
        ctx.fillText(text, i * 20, matrixDrops[i] * 20);

        // Reset drop back to the top when it reaches the bottom with a probability
        if (matrixDrops[i] * 20 > canvas.height && Math.random() > 0.975) {
            matrixDrops[i] = 0;
        }

        // Move the drop down
        matrixDrops[i]++;
    }
}

/**
 * Function to resize the canvas on window resize
 */
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    matrixColumns = Math.floor(canvas.width / 20);
}

/**
 * Function to handle the main animation loop
 */
function animate() {
    drawMatrix();
    requestAnimationFrame(animate);
}

// Event listener for window resize
window.addEventListener('resize', () => {
    resizeCanvas();
    // Clear the matrixDrops array on resize
    matrixDrops.length = 0;
    // Reinitialize the matrixDrops array
    matrixDrops.push(...Array.from({ length: matrixColumns }, () => Math.floor(Math.random() * canvas.height)));
});

// Start the animation loop
animate();