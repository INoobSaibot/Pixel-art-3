import React, { Component } from 'react';
import './canvas.css'

class Canvas extends Component {
    constructor(props) {
      super(props);
      this.state = {}
    }

    render() {
        let canvasHref = '';
        const fileName = this.props.artName + '.png';
        if (this.refs.canvas) {
            this.paintCanvas();
            canvasHref = this.exportCanvasAsPng();
        };

        return (
              <div>
                  <a className='download' download={fileName} href={canvasHref}>Download</a>
                  <canvas ref='canvas' width={300} height={300} className='canvas'></canvas>
              </div>
        );
      }

    exportCanvasAsPng(){
        const canvas = this.refs.canvas;
        const MIME_TYPE = "image/png";
        const imgURL = canvas.toDataURL(MIME_TYPE);

        return imgURL
    }

    paintCanvas = () => {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");

        this.clearCanvas(canvas);
        const rows = this.props.pixelData;
        let row_number = -1;
        rows.forEach( (rowOfPixels) => {
            let column_number = 0;
            row_number++;
            rowOfPixels.forEach( pixel => {
                if (pixel) {
                    ctx.fillStyle = pixel;
                    this.drawOnCanvas(ctx, row_number, column_number)
                }
                column_number++;
            })
        })
    }

    clearCanvas(canvas) {
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    }

    drawOnCanvas(ctx, row, column) {
        let width = 10;
        let height = 10;
        let x_start = width * column; 
        let y_start = height * row;
        ctx.fillRect(x_start, y_start, width, height);
    }

}

export default Canvas;