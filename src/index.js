import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

function App( { rows=100, cols=100, cellSize=10 } ) {

    if ( rows * cols > 32768 || rows * cols < 8 ) {
        throw new Error( 'Color numbers are between 8 and 32768.' )
    }

    const width = cols * cellSize;
    const height = rows * cellSize;

    const canvasRef = useRef(null);
    useEffect( () => draw(canvasRef.current) );

    // Color numbers in each base color. e.g. In 100*100 grid, there are 22 reds, 22 greens, 22 blues.
    const each = Math.ceil( Math.pow(rows * cols, 1/3) );
    const colorStep = parseInt( 256 / each / 8 ) * 8;

    function draw( canvas ) {

        const context = canvas.getContext('2d');

        for ( let i = 0; i < rows; i++ ) {

            for ( let j = 0; j < cols; j++ ) {

                const colorIndex = i * rows + j;
                const blueIndex = colorIndex % each;
                const greenIndex = ( (colorIndex - blueIndex) / each ) % each;
                const redIndex = ( (colorIndex - blueIndex - greenIndex * each) / each / each ) % each;

                // Subtract from 255, to make colors brighter
                const r = 255 - colorStep * redIndex;
                const g = 255 - colorStep * greenIndex;
                const b = 255 - colorStep * blueIndex;

                const rgb = `rgb(${r}, ${g}, ${b})`;

                context.fillStyle = rgb;
                context.fillRect( j * cellSize, i * cellSize , cellSize, cellSize );
            }
        }
    }
    
    return <canvas width={width} height={height} ref={canvasRef}></canvas>
}

ReactDOM.render(
    <App rows={50} cols={50} />,
    document.getElementById('container')
);
