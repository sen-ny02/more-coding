const gridContainer = document.getElementById('grid-container');
const cellSize = 32;
let cells = [];
let rows, cols;

function createGrid() {
    // Clear previous grid
    gridContainer.innerHTML = '';
    cells = [];

    cols = Math.ceil(window.innerWidth / cellSize);
    rows = Math.ceil(window.innerHeight / cellSize);

    gridContainer.style.display = 'grid';
    gridContainer.style.gridTemplateRows = `repeat(${rows}, ${cellSize}px)`;
    gridContainer.style.gridTemplateColumns = `repeat(${cols}, ${cellSize}px)`;
    gridContainer.style.width = '100vw';
    gridContainer.style.height = '100vh';
    gridContainer.style.position = 'absolute';
    gridContainer.style.top = '0';
    gridContainer.style.left = '0';
    gridContainer.style.margin = '0';

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cell = document.createElement('div');
            cell.classList.add('grid-cell');
            cell.dataset.row = r;
            cell.dataset.col = c;
            gridContainer.appendChild(cell);
            cells.push(cell);
        }
    }
}

createGrid();
window.addEventListener('resize', createGrid);

// Handle click
gridContainer.addEventListener('click', function(e) {
    const rect = gridContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const clickedCol = Math.floor(x / cellSize);
    const clickedRow = Math.floor(y / cellSize);

    cells.forEach(cell => {
        const r = parseInt(cell.dataset.row);
        const c = parseInt(cell.dataset.col);
        const dist = Math.abs(r - clickedRow) + Math.abs(c - clickedCol);

        anime({
            targets: cell,
            scale: [
                { value: 1.3, duration: 200, easing: 'easeOutQuad' },
                { value: 1, duration: 400, easing: 'easeOutElastic(1, .5)' }
            ],
            backgroundColor: [
                { value: '#bc9abc', duration: 200, easing: 'easeOutQuad' },
                { value: '#22223b', duration: 400, easing: 'easeOutElastic(1, .5)' }
            ],
            delay: dist * 30
        });
    });
});
