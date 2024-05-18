class sketchPadContain {
    constructor(container, size = 400) {
        this.canvas = document.createElement("canvas");
        this.canvas.height = size;
        this.canvas.width = size;
        this.canvas.style = `
        background-color: white;
        box-shadow: 0 0 10px 2px black;
        `;
        container.appendChild(this.canvas);

        this.ctx = this.canvas.getContext("2d");
        this.isDrawing = false;
        this.path = [];


        this.#addEventListener();
    }

    #addEventListener = () => {
        this.canvas.onmousedown = (event) => {
            const mouse = this.#getMouse(event);
            this.path = [mouse];
            this.isDrawing = true;
        }

        this.canvas.onmousemove = (event) => {
            if(this.isDrawing) {
                const mouse = this.#getMouse(event);
                this.path.push(mouse);
                console.log(this.path.length);
                this.#reDraw();
            }
        }

        this.canvas.onmouseup = () => {
            this.isDrawing = false;
        }
    }

    #getMouse = (event) => {
        const rect = this.canvas.getBoundingClientRect();
            return [
                Math.round(event.clientX - rect.left),
                Math.round(event.clientY - rect.top)
            ];
    }

    #reDraw = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        draw.path(this.ctx, this.path);
    }
}