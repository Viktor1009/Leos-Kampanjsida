export class Car {
  constructor(parent = document.body, speed) {
    this.parentSize = parent.getBoundingClientRect();
    this.x = this.parentSize.width + 60;
    this.y = 290;
    this.div = document.createElement("div");
    this.div.classList.add("car");
    parent.appendChild(this.div);

    this.speed = speed;
    this.gone = false;
  }

  resetPosition() {
    this.x = this.parentSize.width + 60;
  }

  update(deltatime) {
    this.x += this.speed * deltatime;
    if (this.x < -60) {
      this.gone = true;
    }
  }

  draw() {
    this.div.style.left = `${this.x}px`;
    this.div.style.top = `${this.y}px`;
  }
}
