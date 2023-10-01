import { blogPosts } from "./blogPosts.js";
const container = document.querySelector('.blog__page__container')
const urlParams = new URLSearchParams(window.location.search);
const slug = urlParams.get('slug');

console.log(slug)
const post = blogPosts.filter(p => p.slug === slug)[0];

let header = document.createElement('h1');
header.textContent = post.title;

let image = document.createElement('img');
image.setAttribute('src', post.image);
image.classList.add('main__image')

container.appendChild(header)
container.appendChild(image)

post.content.forEach(c => {
    let contentEl = document.createElement(c[0]);
    contentEl.textContent = c[1];
    contentEl.style.marginBottom = '1rem'
    container.appendChild(contentEl);
})

