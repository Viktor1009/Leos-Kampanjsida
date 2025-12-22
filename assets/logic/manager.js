import { Triangle } from "./triangle.js";

export class Manager {
    constructor(parent) {
        this.amount = 1;
        this.triangles = [];
        this.parent = parent;
        this.#init();
        this.timer = 0;
        this.newtriangle = 2;
    }

    #init(){
        let triangle = new Triangle(this.parent, -200);
        this.triangles.push(triangle);
    }

    update(deltaTime){
        let newArr = [];
        this.timer += deltaTime;
        if(this.timer > this.newtriangle){
            let triangle = new Triangle(this.parent, Math.random()*-300);
            this.triangles.push(triangle);
            this.timer = 0;
        }

        for(let x = 0; x < this.triangles.length; x++){
            this.triangles[x].update(deltaTime);
            if(!this.triangles[x].gone){
                newArr.push(this.triangles[x]);
            }else {
                this.triangles[x].div.remove();
            }
        }
        this.triangles = newArr;


        
    }
    draw(deltaTime){
        for(let x = 0; x < this.triangles.length; x++){
            this.triangles[x].draw();
        }
    }
}