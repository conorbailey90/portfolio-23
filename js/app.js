import { blogPosts } from "./blogPosts.js";
const dateText = document.querySelector('.date');
const projectModal = document.querySelector('.project__modal')

// Date settings
let date = new Date()
let days = ['Sunday', 'Monday', 'Tuesday', ' Wednesday', 'Thursday', ' Friday', 'Saturday'];
let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
dateText.innerText = `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`


class Canvas{
  constructor(el){
    this.canvas = el;
    this.ctx = this.canvas.getContext('2d')
    this.a = 2 * Math.PI / 6; // Angle
    this.r = 50; // Radius for hexagon
    this.addBlob()
    this.init();
    this.addEventListener();
  }

  init(){
    this.parentWidth = this.canvas.parentElement.getBoundingClientRect().width;
    this.parentHeight = this.canvas.parentElement.getBoundingClientRect().height;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.canvas.width = (1800 * 2) * 2
    this.canvas.height = this.canvas.offsetHeight * 2
    this.drawGrid(this.canvas.width, this.canvas.height);
  }

  drawGrid(width, height) {
    for (let y = this.r, j = 0; y + this.r * Math.sin(this.a) < height; y += (2 ** ((j + 1) % 2) * this.r * Math.sin(this.a)) + 5, j = 0) {
      for (let x = this.r; x + this.r * (1 + Math.cos(this.a)) < width; x += (this.r * (1 + Math.cos(this.a))) + 5, y += (-1) ** j++ * this.r * Math.sin(this.a)) {
        this.drawHexagon(x, y);
      }
    }
  }
  
  drawHexagon(x, y) {
    this.ctx.fillStyle = `#161616`
    this.ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      this.ctx.lineTo(x + this.r * Math.cos(this.a * i), y + this.r * Math.sin(this.a * i));
    }
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.fill()
  }

  addEventListener(){
    window.addEventListener('resize', this.init.bind(this))
  }

  addBlob(){
    this.blob = document.createElement('div');
    this.blob.classList.add('blob')
    this.canvas.parentElement.appendChild(this.blob);
    this.posX = 1;
    this.posY = 1;
    this.speedX = 1;
    this.speedY = 1;
  }

  animateBlob(){
    this.posX += this.speedX;
    this.posY += this.speedY;
    if(this.posX >= this.parentWidth -75) this.speedX = -1
    if(this.posX <= 0) this.speedX = 1
    if(this.posY >= this.parentHeight - 50) this.speedY = -1
    if(this.posY <= 0) this.speedY = 1
    this.blob.style.transform = `translate3d(${this.posX}px, ${this.posY}px, 0)`
  }
}

let canvasArr = [];

// Hexagon pattern
[...document.querySelectorAll('canvas')].forEach(c => {
  let canvas = new Canvas(c);
  canvasArr.push(canvas)
})

function animate(){

  for(let i = 0; i < canvasArr.length; i++){
    canvasArr[i].animateBlob();
  }

  requestAnimationFrame(animate)
}
animate()


// Blog

const blogContainer = document.querySelector('.blog__container');
blogPosts.forEach(post => {

  let a = document.createElement('a');
  a.setAttribute('href', `./blogpost.html?slug=${post.slug}`);
  a.classList.add('blog__card')

  let blogCard = document.createElement('div');
  blogCard.classList.add('blog__card')

  let header = document.createElement('h3')
  header.textContent = post.title;

  let imageContainer = document.createElement('div');
  imageContainer.classList.add('image__container');


  let image = document.createElement('img');
  image.classList.add('blog__card__img')
  image.setAttribute('src', post.image);
  imageContainer.appendChild(image);
  blogCard.appendChild(imageContainer)
  blogCard.appendChild(header)

  a.appendChild(blogCard)

  blogContainer.appendChild(a)

})

