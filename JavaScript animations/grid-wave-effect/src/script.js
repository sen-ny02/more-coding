document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.getElementById('wrapper');
    const rows = 5;
    const cols = 5;

    // Create grid tiles
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            wrapper.appendChild(tile);
        }
    }

    // Function to trigger wave effect
    function triggerWave(event) {
        const tiles = document.querySelectorAll('.tile');
        const clickX = event.clientX;
        const clickY = event.clientY;

        tiles.forEach((tile, index) => {
            const tileRect = tile.getBoundingClientRect();
            const tileX = tileRect.left + tileRect.width / 2;
            const tileY = tileRect.top + tileRect.height / 2;

            const distance = Math.sqrt(Math.pow(tileX - clickX, 2) + Math.pow(tileY - clickY, 2));
            const delay = distance / 5; // Adjust the divisor for speed of wave

            anime({
                targets: tile,
                translateY: [0, -30, 0],
                opacity: [1, 0.5, 1],
                duration: 1000,
                easing: 'easeInOutSine',
                delay: delay,
            });
        });
    }

    // Add click event listener to the wrapper
    wrapper.addEventListener('click', triggerWave);
});